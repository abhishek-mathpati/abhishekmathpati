import { defineConfig, loadEnv, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { name, email, message, _honey } = data;

            if (_honey) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true }));
            }

            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
            }

            const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
            const recipientEmail = env.CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'saisujithmendru@gmail.com';

            if (!apiKey || apiKey.startsWith('re_123456789')) {
              // Simulated success in dev if using placeholder key
              console.log('[Dev Contact API] Received transmission:', { name, email, message, recipientEmail });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({
                success: true,
                devMode: true,
                message: 'Message logged in dev console (add your real RESEND_API_KEY in .env.local to dispatch via Resend)'
              }));
            }

            const { Resend } = await import('resend');
            const resend = new Resend(apiKey);
            const sendResult = await resend.emails.send({
              from: 'Portfolio Contact <onboarding@resend.dev>',
              to: recipientEmail,
              replyTo: email,
              subject: `New Portfolio Message from ${name}`,
              text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
              html: `
                <div style="font-family: monospace; background: #0a0a0a; color: #f0f0f0; padding: 24px; border-radius: 8px;">
                  <h2 style="color: #4285F4; border-bottom: 1px solid #222; padding-bottom: 12px;">New Contact Submission</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
                  <p><strong>Message:</strong></p>
                  <div style="background: #141414; padding: 16px; border-left: 3px solid #4285F4; white-space: pre-wrap;">${message}</div>
                </div>
              `
            });

            if (sendResult.error) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: sendResult.error.message }));
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, id: sendResult.data?.id }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
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
