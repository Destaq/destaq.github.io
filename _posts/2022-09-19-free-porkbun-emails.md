---
layout: single
title: "How to Create a Free Custom Email Address with SendGrid"
date: 2023-04-15 10:00:00 +0200
categories: tutorial resources learning
entries_layout: grid
tags: domains porkbun sendgrid email
toc: true
toc_sticky: true
excerpt: A comprehensive guide on how to set up a send-to and receive-from custom email address using Porkbun and SendGrid — without paying for anything except your domain.
header:
    image: /assets/images/posts/email.jpeg
---

## Introduction

Having a custom email address that matches your domain name is essential for maintaining a professional online presence. While many email providers charge for this service, it's possible to set up a custom email address for free using your domain registrar and an email sending platform.

In this updated tutorial, I'll walk you through the process using Porkbun as the domain registrar and SendGrid as the email sending platform. Thanks to this trick, I now have 5 custom email addresses for my various projects, all for free! What's more, they are also all optimized for deliverability.

## Prerequisites

- A domain name (we'll use Porkbun in this example, but any registrar should work)
- A personal Gmail account
- A SendGrid account (free tier available)

## Step 1: Set up email forwarding

First, we need to set up email forwarding from your custom domain to your personal email address.

1. Log in to your Porkbun account and navigate to your domain's settings.
2. Find the email forwarding section and set up forwarding from `your-name@yourdomain.com` to `your-personal-email@gmail.com`.

**Note**: If you're using a different DNS provider (e.g., Digital Ocean), you may need to copy the MX records (usually 2) and TXT record (1) to that provider to ensure that your emails are routed correctly.

## Step 2: Set up SendGrid

SendGrid will handle the sending of emails from your custom address.

1. Create a [SendGrid account](https://sendgrid.com) if you haven't already.
2. Follow the [SendGrid onboarding guide](https://app.sendgrid.com/guide) to link your custom domain to SendGrid through the "Authentication" tab.
3. Add the required DNS records (mostly CNAME records) to your domain registrar (Porkbun or GoDaddy, for example).

## Step 3: Configure Gmail

Now we'll set up Gmail to send emails using your custom address.

1. Open your Gmail account and go to Settings > See All Settings > Accounts & Import.
2. In the "Send mail as" section, click on "Add another email address".
3. Fill out the following information:
   - Name: Your name or business name
   - Email address: Your custom email (e.g., `your-name@yourdomain.com`)
   - Check "Treat as an alias"
4. Click "Next Step". Keep this tab open for now.

## Step 4: Generate SendGrid API key

1. In SendGrid, go to Settings > API Keys.
2. Create a new API key with "Mail Send" full access permission.
3. Copy the generated API key (you won't be able to see it again).

## Step 5: Configure SMTP settings in Gmail

In the Gmail "Add another email address" window, enter the following SMTP settings:

| Key         | Value                      |
| ----------- | -------------------------- |
| SMTP Server | smtp.sendgrid.net          |
| Port        | 587                        |
| Username    | apikey                     |
| Password    | \<your-sendgrid-api-key\>    |
| Connection  | Secured with TLS           |

Click "Add Account" to save the changes.

## Step 6: Verify your email address

If you're creating a new email alias, Gmail will send a verification email to your custom address. Click the verification link in that email to complete the setup.

## Step 7: Final SendGrid configuration

1. In SendGrid, verify your Single Sender identity.
2. Set up link branding for your domain on SendGrid so that emails are sent from your domain rather than the default `sendgrid.net`.

## Conclusion

Congratulations! You've now set up a custom email address that you can use to send and receive emails through your Gmail account. This setup provides you with a professional email address without the need for paid email hosting services.

Remember to test your new email setup by sending a test email from your Gmail account using the new custom email address. If you encounter any issues, double-check your DNS records and SendGrid configuration or reach out to me at my own Gmail-hosted custom email address on the sidebar!