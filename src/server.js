require('dotenv').config();
const path = require('path');
const express = require('express');
require('./db'); // ensures schema is created on boot

const signupRouter = require('./routes/signup');
const { webhookRouter, apiRouter: billingApiRouter } = require('./routes/billing');

const app = express();

// Stripe webhook needs the raw body, so mount it BEFORE express.json()
// swallows the request into parsed JSON.
app.use(webhookRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(signupRouter);
app.use(billingApiRouter);

app.get('/healthz', (req, res) => res.json({ ok: true, app: process.env.APP_NAME || 'In Rhythm' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${process.env.APP_NAME || 'In Rhythm'} running on http://localhost:${PORT}`);
});
