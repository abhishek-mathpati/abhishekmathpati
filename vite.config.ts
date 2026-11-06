import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          return res.end();
        }

        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');

          try {
            const data = JSON.parse(body || '{}');
            const { name, email, message, _honey } = data;

            if (_honey) {
              res.statusCode = 200;
              return res.end(JSON.stringify({ success: true, message: 'Message acknowledged' }));
            }

            const cleanName = (typeof name === 'string' ? name : '').trim();
            const cleanEmail = (typeof email === 'string' ? email : '').trim().toLowerCase();
            const cleanMessage = (typeof message === 'string' ? message : '').trim();

            if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Please enter a valid name (2 to 100 characters).' }));
            }

            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
            if (!cleanEmail || cleanEmail.length > 254 || !emailRegex.test(cleanEmail)) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Please enter a valid email address.' }));
            }

            if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 5000) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Message must be between 5 and 5,000 characters.' }));
            }

            const apiKey = (env.RESEND_API_KEY || process.env.RESEND_API_KEY || '').trim();
            const recipientEmail = (env.CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'abhishekmathpati2027@gmail.com').trim();
            const rawFrom = (env.EMAIL_FROM || process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>').trim();
            const fromAddress = rawFrom.includes('<') ? rawFrom : `Portfolio Contact <${rawFrom}>`;

            if (!apiKey || apiKey.startsWith('re_123456789')) {
              console.log('[Dev Contact API] Received transmission:', { cleanName, cleanEmail, cleanMessage, recipientEmail });
              res.statusCode = 200;
              return res.end(JSON.stringify({
                success: true,
                devMode: true,
                message: 'Message logged in dev console (add real RESEND_API_KEY in .env.local to dispatch via Resend)'
              }));
            }

            const { Resend } = await import('resend');
            const resend = new Resend(apiKey);
            const sendResult = await resend.emails.send({
              from: fromAddress,
              to: recipientEmail,
              replyTo: cleanEmail,
              subject: `New Portfolio Message from ${cleanName}`,
              text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nSent At: ${new Date().toISOString()}\n\nMessage:\n${cleanMessage}`,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 14px; overflow: hidden; border: 1px solid #334155;">
                  <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px 28px; border-bottom: 1px solid #334155;">
                    <h2 style="margin: 0; color: #38bdf8; font-size: 19px; font-weight: 700;">Portfolio Transmission</h2>
                    <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Direct message received via portfolio contact modal</p>
                  </div>
                  <div style="padding: 24px 28px;">
                    <p><strong>Sender:</strong> ${cleanName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${cleanEmail}" style="color: #60a5fa;">${cleanEmail}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #1e293b; border-left: 3px solid #38bdf8; border-radius: 6px; padding: 16px; color: #e2e8f0; white-space: pre-wrap;">${cleanMessage}</div>
                  </div>
                </div>
              `
            });

            if (sendResult.error) {
              res.statusCode = 502;
              return res.end(JSON.stringify({ error: `Resend error: ${sendResult.error.message}` }));
            }

            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, id: sendResult.data?.id, message: 'Message sent successfully.' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      tailwindcss(),
      react(),
      contactApiPlugin(env)
    ],
    server: {
      port: 3000,
      host: true
    }
  };
});
