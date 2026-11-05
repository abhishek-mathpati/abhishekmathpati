import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting (3 requests per minute per IP)
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

export async function POST(request: NextRequest) {
    try {
        // 1. Rate Limiting Check
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const rateData = rateLimitMap.get(ip);
        if (rateData) {
            if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
                rateLimitMap.set(ip, { count: 1, lastReset: now });
            } else {
                rateData.count += 1;
                if (rateData.count > MAX_REQUESTS) {
                    return NextResponse.json(
                        { error: 'Rate limit exceeded. Please wait a minute.' },
                        { status: 429 }
                    );
                }
            }
        } else {
            rateLimitMap.set(ip, { count: 1, lastReset: now });
        }

        // 2. Parse payload (Supports multipart/form-data with attachments or JSON)
        let name = '';
        let email = '';
        let message = '';
        let _honey = '';
        let attachments: { filename: string; content: Buffer }[] = [];

        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            name = (formData.get('name') as string) || '';
            email = (formData.get('email') as string) || '';
            message = (formData.get('message') as string) || '';
            _honey = (formData.get('_honey') as string) || '';

            const files = formData.getAll('files').filter((f): f is File => f instanceof File);
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                attachments.push({
                    filename: path.basename(file.name).replace(/[^\w.\-() ]/g, '_'),
                    content: Buffer.from(arrayBuffer),
                });
            }
        } else {
            const body = await request.json();
            name = body.name || '';
            email = body.email || '';
            message = body.message || '';
            _honey = body._honey || '';
        }

        // 3. Honeypot check (silently trap bots)
        if (_honey) {
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 4. Input validation
        name = sanitizeText(name);
        email = sanitizeText(email);
        message = sanitizeText(message);

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        // 5. Send with Resend
        const recipientEmail = process.env.CONTACT_EMAIL || 'abhishekmathpati2027@gmail.com';
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain in production
            to: recipientEmail,
            replyTo: email,
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
            attachments: attachments.length > 0 ? attachments : undefined,
        });

        if (error) {
            console.error('[Resend API Error]:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
    } catch (err: any) {
        console.error('[Contact Error]:', err);
        return NextResponse.json(
            { error: err?.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

