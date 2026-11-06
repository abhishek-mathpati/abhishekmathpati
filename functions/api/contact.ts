// Cloudflare Pages edge runtime types & fallback ambient declarations
declare const process: any;
type PagesFunction<T = any> = (context: {
  request: Request;
  env: T;
  params?: Record<string, string | string[]>;
  waitUntil?: (promise: Promise<any>) => void;
  next?: () => Promise<Response>;
  data?: Record<string, any>;
}) => Promise<Response> | Response;

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
  EMAIL_FROM?: string;
  [key: string]: any;
}

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 3; // Max 3 requests per IP per minute

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data: Record<string, any>, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Case-insensitive lookup for environment variables across Cloudflare Pages context,
 * process.env, and global scope.
 */
function resolveEnv(env: Record<string, any> | undefined, key: string): string {
  if (env && typeof env === 'object') {
    if (env[key]) return String(env[key]).trim();
    const target = key.toLowerCase();
    for (const [k, v] of Object.entries(env)) {
      if (k.toLowerCase() === target && v) {
        return String(v).trim();
      }
    }
  }

  // Fallback for node/local environments
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return String(process.env[key]).trim();
    const target = key.toLowerCase();
    for (const [k, v] of Object.entries(process.env)) {
      if (k.toLowerCase() === target && v) {
        return String(v).trim();
      }
    }
  }

  // Fallback for global scope
  if (typeof globalThis !== 'undefined' && (globalThis as any)?.[key]) {
    return String((globalThis as any)[key]).trim();
  }

  return '';
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // 1. IP Detection & Rate Limiting
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      'unknown';

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);
    if (rateData) {
      if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        rateData.count += 1;
        if (rateData.count > MAX_REQUESTS) {
          return jsonResponse(
            { error: 'Rate limit exceeded. Please wait a minute before transmitting again.' },
            429
          );
        }
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    }

    // 2. Parse payload safely (JSON or FormData)
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
      try {
        const body = (await request.json()) as any;
        name = body?.name || '';
        email = body?.email || '';
        message = body?.message || '';
        _honey = body?._honey || '';
      } catch {
        return jsonResponse({ error: 'Malformed JSON payload.' }, 400);
      }
    }

    // 3. Honeypot check: silently accept bots without sending email
    if (_honey) {
      return jsonResponse({ success: true, message: 'Message acknowledged' }, 200);
    }

    // 4. Strict input sanitization and validation
    name = sanitizeText(name);
    email = sanitizeText(email).toLowerCase();
    message = sanitizeText(message);

    if (!name || name.length < 2 || name.length > 100) {
      return jsonResponse(
        { error: 'Please enter a valid name (2 to 100 characters).' },
        400
      );
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || email.length > 254 || !emailRegex.test(email)) {
      return jsonResponse(
        { error: 'Please enter a valid email address.' },
        400
      );
    }

    if (!message || message.length < 5 || message.length > 5000) {
      return jsonResponse(
        { error: 'Message must be between 5 and 5,000 characters.' },
        400
      );
    }

    // 5. Read environment variables from Cloudflare Pages runtime bindings
    const apiKey = resolveEnv(env, 'RESEND_API_KEY');
    const recipientEmail = resolveEnv(env, 'CONTACT_EMAIL') || 'abhishekmathpati2027@gmail.com';
    const rawFrom = resolveEnv(env, 'EMAIL_FROM') || 'Portfolio Contact <onboarding@resend.dev>';
    const fromAddress = rawFrom.includes('<') ? rawFrom : `Portfolio Contact <${rawFrom}>`;

    if (!apiKey) {
      console.error('[Cloudflare Edge Error]: RESEND_API_KEY is not bound in context.env');
      return jsonResponse(
        {
          error:
            'RESEND_API_KEY not configured on server. Please ensure RESEND_API_KEY is added under Cloudflare Pages → Settings → Variables and Secrets.',
        },
        500
      );
    }

    // 6. Send email via Resend REST API (Edge compatible, zero Node dependencies)
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: recipientEmail,
        reply_to: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nClient IP: ${ip}\nSent At: ${new Date().toISOString()}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 14px; overflow: hidden; border: 1px solid #334155;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px 28px; border-bottom: 1px solid #334155;">
              <h2 style="margin: 0; color: #38bdf8; font-size: 19px; font-weight: 700; letter-spacing: -0.01em;">Portfolio Transmission</h2>
              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Direct message received via portfolio contact modal</p>
            </div>
            <div style="padding: 24px 28px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 80px; font-weight: 600;">Sender:</td>
                  <td style="padding: 6px 0; color: #f1f5f9; font-size: 14px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-size: 14px;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Time:</td>
                  <td style="padding: 6px 0; color: #94a3b8; font-size: 12px; font-family: monospace;">${new Date().toUTCString()}</td>
                </tr>
              </table>
              <div style="margin-top: 16px;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message Body:</p>
                <div style="background: #1e293b; border-left: 3px solid #38bdf8; border-radius: 6px; padding: 16px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            <div style="background: #090d16; padding: 14px 28px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="margin: 0; color: #64748b; font-size: 11px; font-family: monospace;">Source IP: ${ip} • Sent via Resend API</p>
            </div>
          </div>
        `,
      }),
    });

    const resData = (await resendRes.json().catch(() => ({}))) as any;

    if (!resendRes.ok || !resData?.id) {
      console.error('[Resend API Error]:', resendRes.status, resData);
      const providerError = resData?.message || resData?.error || 'Email dispatch was rejected by provider.';
      return jsonResponse(
        { error: `Resend error: ${providerError}` },
        resendRes.status >= 400 && resendRes.status < 600 ? resendRes.status : 502
      );
    }

    // 7. Verified success response containing provider confirmation ID
    return jsonResponse(
      {
        success: true,
        id: resData.id,
        message: 'Email accepted and dispatched successfully by Resend.',
      },
      200
    );
  } catch (err: any) {
    console.error('[Internal Contact Error]:', err);
    return jsonResponse(
      { error: err?.message || 'An internal server error occurred while processing transmission.' },
      500
    );
  }
};
