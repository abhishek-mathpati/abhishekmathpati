interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  EMAIL_FROM?: string;
}

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

function sanitizeText(input: string): string {
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // 1. Rate Limiting Check
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        rateData.count += 1;
        if (rateData.count > MAX_REQUESTS) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute.' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    // 2. Parse payload
    let name = '';
    let email = '';
    let message = '';
    let _honey = '';

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      message = (formData.get('message') as string) || '';
      _honey = (formData.get('_honey') as string) || '';
    } else {
      const body = (await request.json()) as any;
      name = body.name || '';
      email = body.email || '';
      message = body.message || '';
      _honey = body._honey || '';
    }

    // 3. Honeypot check
    if (_honey) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Input validation
    name = sanitizeText(name);
    email = sanitizeText(email);
    message = sanitizeText(message);

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Send with Resend REST API (Edge compatible)
    const apiKey = env.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : '');
    const recipientEmail = env.CONTACT_EMAIL || (typeof process !== 'undefined' ? process.env?.CONTACT_EMAIL : '') || 'abhishekmathpati2027@gmail.com';
    const rawFrom = env.EMAIL_FROM || (typeof process !== 'undefined' ? process.env?.EMAIL_FROM : '') || 'Portfolio Contact <onboarding@resend.dev>';
    const fromAddress = rawFrom.includes('<') ? rawFrom : `Portfolio Contact <${rawFrom}>`;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured on server' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: recipientEmail,
        reply_to: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nIP: ${ip}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: monospace; background: #0a0a0a; color: #f0f0f0; padding: 24px; border-radius: 8px;">
            <h2 style="color: #4285F4; border-bottom: 1px solid #222; padding-bottom: 12px;">New Contact Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: #141414; padding: 16px; border-left: 3px solid #4285F4; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      }),
    });

    const resData = (await resendRes.json()) as any;
    if (!resendRes.ok) {
      console.error('[Resend Error]:', resData);
      return new Response(JSON.stringify({ error: resData?.message || 'Failed to send email' }), {
        status: resendRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: resData?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

