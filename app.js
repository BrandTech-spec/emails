import { Resend } from "resend";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const resend = new Resend("re_7k74iqku_DYuXVNkVXNuZ5U2ed69wkg5X");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Email Templates
const getDepositEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Successful - OANDA</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            font-style: italic;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
            background-color: #1f2937;
            color: white;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 25px;
            color: #d1d5db;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        .details-table td {
            padding: 12px 0;
            border-bottom: 1px solid #374151;
        }
        .details-table td:first-child {
            color: #9ca3af;
            width: 40%;
        }
        .details-table td:last-child {
            color: white;
            font-weight: 500;
        }
        .hash {
            word-break: break-all;
            font-family: monospace;
            font-size: 14px;
            color: #1e3a8a;
        }
        .footer {
            padding: 30px;
            background-color: #f9fafb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .contact-links {
            margin: 15px 0;
        }
        .contact-links a {
            color: #1e3a8a;
            text-decoration: none;
            margin: 0 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">OANDA</div>
            <h1>Your ${data.currency} deposit was successful</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${data.customerName},</div>
            
            <div class="message">
                <strong style="font-size: 20px;">Your funds are secured!</strong>
            </div>
            
            <div class="message">
                The funds have been successfully credited to your account.
            </div>
            
            <table class="details-table">
                <tr>
                    <td>Deposit amount</td>
                    <td>${data.amount} ${data.currency}</td>
                </tr>
                <tr>
                    <td>Account identifier</td>
                    <td>${data.accountId}</td>
                </tr>
                <tr>
                    <td>Transaction hash</td>
                    <td class="hash">${data.transactionHash}</td>
                </tr>
            </table>
        </div>
        
        <div class="footer">
            If you have any questions, contact us via
            <div class="contact-links">
                <a href="${data.liveChatUrl || '#'}">Live Chat</a> | 
                <a href="${data.whatsappUrl || '#'}">WhatsApp</a>
            </div>
        </div>
    </div>
</body>
</html>`;
};

const getWithdrawalEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Processed - OANDA</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            font-style: italic;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
            background-color: #1f2937;
            color: white;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 25px;
            color: #d1d5db;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .footer {
            padding: 30px;
            background-color: #f9fafb;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
        }
        .contact-links {
            margin: 15px 0;
        }
        .contact-links a {
            color: #1e3a8a;
            text-decoration: none;
            margin: 0 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">OANDA</div>
            <h1>We have processed your withdrawal request</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${data.customerName},<br>Account OANDA ${data.accountId}</div>
            
            <div class="message">
                We have successfully processed your withdrawal request of $${data.amount} ${data.currency} corresponding to trace ID ${data.traceId}.
            </div>
            
            
        </div>
        
        <div class="footer">
            <div>Account Payment - OANDA (SVG) LLC</div>
            <div>${data.currency} - TraceID <strong style="color: #1e3a8a;">${data.traceId}</strong></div>
            <div style="margin-top: 20px;">
                If you have any questions, contact us via
                <div class="contact-links">
                    <a href="${data.liveChatUrl || '#'}">Live Chat</a> | 
                    <a href="${data.whatsappUrl || '#'}">WhatsApp</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

app.get("/", async (req, res) => {
  res.json({
    message: 'OANDA Email Templates API',
    endpoints: {
      'POST /send_deposit_email': 'Send deposit confirmation email',
      'POST /send_withdrawal_email': 'Send withdrawal confirmation email',
      'GET /preview_deposit': 'Preview deposit email template',
      'GET /preview_withdrawal': 'Preview withdrawal email template'
    }
  });
});

app.post("/send_deposit_email", async (req, res) => {
  const {
    email,
    customerName,
    amount,
    currency = 'eUSDT',
    accountId,
    transactionHash,
    liveChatUrl,
    whatsappUrl
  } = req.body;

  try {
    const htmlContent = getDepositEmailTemplate({
      customerName,
      amount,
      currency,
      accountId,
      transactionHash,
      liveChatUrl,
      whatsappUrl
    });

    const data = await resend.emails.send({
      from: "info@bonplanfinance.com",
      to: email,
      subject: `Your ${currency} deposit was successful`,
      html: htmlContent,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/send_withdrawal_email", async (req, res) => {
  const {
    email,
    customerName,
    amount,
    currency = 'USD',
    accountId,
    traceId,
    liveChatUrl,
    whatsappUrl
  } = req.body;

  try {
    const htmlContent = getWithdrawalEmailTemplate({
      customerName,
      amount,
      currency,
      accountId,
      traceId,
      liveChatUrl,
      whatsappUrl
    });

    const data = await resend.emails.send({
      from: "info@bonplanfinance.com",
      to: email,
      subject: "Your withdrawal request has been processed",
      html: htmlContent,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/preview_deposit", async (req, res) => {
  const sampleData = {
    customerName: 'Abla Victoire',
    amount: '200',
    currency: 'eUSDT',
    accountId: 'CRW73162',
    transactionHash: '0x90ff7f2a0b474d7791bb6294efa15cef6095469ffda5dd9f81ce108fe56e119b',
    liveChatUrl: '#',
    whatsappUrl: '#'
  };

  const htmlContent = getDepositEmailTemplate(sampleData);
  res.send(htmlContent);
});

app.get("/preview_withdrawal", async (req, res) => {
  const sampleData = {
    customerName: 'Abla Victoire Attiogbe',
    amount: '50.00',
    currency: 'USD',
    accountId: 'CR7176586',
    traceId: '65255638',
    liveChatUrl: '#',
    whatsappUrl: '#'
  };

  const htmlContent = getWithdrawalEmailTemplate(sampleData);
  res.send(htmlContent);
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});