const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const recentSubmissions = new Map();

const isEmailConfigured = () => {
  return Boolean(
    process.env.EMAIL_HOST &&
      process.env.EMAIL_PORT &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.CONTACT_TO
  );
};

const sendContactMail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: Number(process.env.EMAIL_PORT || 587) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: `${name} <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `Portfolio enquiry: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
  });
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again in a few minutes.',
  },
});

router.use(rateLimiter);

const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  body('subject')
    .trim()
    .isLength({ min: 2, max: 140 })
    .withMessage('Subject must be between 2 and 140 characters.'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters.'),
];

router.post('/', ...contactValidation, async (req, res) => {
  const honeypot = req.body.website || req.body.company || req.body.honeypot;

  if (honeypot) {
    return res.status(400).json({
      success: false,
      message: 'Your submission could not be processed.',
    });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, email, subject, message } = req.body;
  const dedupeKey = `${(email || '').trim().toLowerCase()}|${(subject || '').trim().toLowerCase()}`;
  const now = Date.now();
  const lastSubmission = recentSubmissions.get(dedupeKey) || 0;

  if (now - lastSubmission < 30000) {
    return res.status(429).json({
      success: false,
      message: 'This message was already submitted recently. Please try again in a moment.',
    });
  }

  recentSubmissions.set(dedupeKey, now);

  try {
    if (!isEmailConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Email delivery is not configured yet. Add SMTP credentials in the environment to enable the contact form.',
      });
    }

    await sendContactMail({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: 'Thanks for reaching out. Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('Contact form delivery failure:', error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong while sending your message. Please try again later.',
    });
  }
});

module.exports = router;
