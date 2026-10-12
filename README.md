# Parth Tiwaskar Portfolio

A personal portfolio website for Parth Tiwaskar, built with Node.js and Express. The site includes a cinematic landing page, content-driven sections, project showcases, a responsive navigation system, and a secure contact form backend.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment example:
   ```bash
   cp .env.example .env
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
   Or in production mode:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in the browser.

## Contact form email setup

The contact backend supports SMTP delivery through Nodemailer when environment variables are configured.

In `.env`, set:

- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `CONTACT_TO`

If these values are left blank, the form still validates inputs and responds safely, but email delivery is disabled until credentials are added.

## Project structure

- `server/app.js` – Express server setup and static asset serving
- `server/routes/contact.js` – Contact form API with validation and rate limiting
- `public/index.html` – Main portfolio page
- `public/css/styles.css` – Full site styling
- `public/js/data/*.js` – Editable portfolio content
- `public/js/main.js` – Rendering and interactions

## Deployment

This app is designed to work on a Node.js-compatible hosting service such as Render, Railway, Fly.io, or a VPS.

Recommended deployment checklist:

- Set `PORT` and `ALLOWED_ORIGINS`
- Add SMTP credentials for email delivery if enabled
- Set `NODE_ENV=production`
- Serve the app with a process manager or the built-in `npm start` command

## Notes

- The resume button is intentionally configurable and can be updated in the data file when a final resume is ready.
- The portfolio uses editable JavaScript data files so personal details, projects, skills, and social links can be updated without editing the HTML layout.
