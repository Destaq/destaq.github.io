---
layout: single
title: "How to Create a Free Custom Email Address with Porkbun"
date: 2022-09-19 05:19:28 +0200
categories: tutorial resources learning
entries_layout: grid
tags: domains porkbun
toc: true
toc_sticky: true
excerpt: A guide on how to set up a send-to and receive-from custom email address — without paying a penny for anything except your domain.
header:
    image: /assets/images/posts/email.jpeg
---

## Introduction

If you buy a domain name, it stands a reason that you should obtain full custom email addresses as well. Unfortunately, most email registrars and even providers themselves make getting one for free quite difficult — but not impossible! Many services will offer you either a custom send-from and receive-to email for a price, or one that you just receive mail from (an 'email forwarding' benefit) for free, but if you'd like the *former* for free, you'll have to do some dirty work yourself.

Fortunately, I've done just that for a couple of domains, and am here to concisely demonstrate how you can too! For this tutorial, I'll be using Gmail and [Porkbun](https://www.porkbun.com), but the steps should be similar for almost any platforms.

## Step 1: Create a domain and email

If you haven't already, buy a domain with a domain name registry service. I personally recommend Porkbun for its low price, but have gone through this process successfully with GoDaddy as well, and heard great things about many others. Regardless, the fundamental custom email will be the same: <span style="font-family: monospace;">something@yourdomain.xyz</span>. So make sure you choose wisely!

Similarly, if you don't already have one, make an email address with any major provider. We'll be sending and receiving your custom-address emails from it.

## Step 2: Set up basic email forwarding
Now that you have a domain, you can set up email *forwarding*. This will take care of one part of the puzzle — redirecting emails meant for your custom email address to one you already have. However, being free, it doesn't allow us to actually *send* emails back aliased as that custom address out of the box.

Nonetheless, it's a required step, and one relatively simple as well. Simply navigate to the settings of your domain, and then to the email forwarding section. Here, you'll be able to set up a custom email address and forward it to an existing one — one which you'll be using in the future as the place to send emails, just masked as your 'custom self'. In Porkbun, doing so looks like this:

![](/assets/images/posts/custom_email_forwarding.png)

## Step 3: Secure your Gmail account

That's all that needs to be done the domain-registrar side of things. But, we're still far from done — the next step is to set up your account to be able to actually send emails. In order to do this (for Gmail at least), you need to first enable 2-Step Verification in your [account's security](https://myaccount.google.com/security). This is a good idea anyway, and enforced in this case as having (potentially multiple) custom emails is something Google views as warranting a higher level of user security.

You can set up 2FA with just a few clicks, and your page should end up looking as the below when you're done:

![](/assets/images/posts/google_account.png)

## Step 4: Generate an App Password

As you'll soon find out, the UI Gmail offers for adding a custom email address is extremely dated (they're perhaps not-so-subtly trying to encourage the use of their paid, no-configuration-required alternative). As such, this feature relies on an older feature of Gmail — that of App Passwords. These are simply 16-character security codes unique to an app/site/tool that give it permission to access your account. For our case, this 'tool' will be another email address. If interested, you can read a bit more about how App Passwords work [here](https://support.google.com/accounts/answer/185833?hl=en).

When you open up the App Passwords page (just below the 2-Step Verification tab you just used), you should see an option to generate a key, as below:

![](/assets/images/posts/start_app_passwords.png)

This will be grayed-out, however, as you first need to assign an identifier to this App Password. As our use case does not fall into any of the preset categories, you can just fill out the 'Other' field with something that will make sense to you — I settled on 'Porkbun Email Forwarder'. This is not important and only serves as a reference to you in the future if you ever return to this page to look over your used App Passwords or revoke any.

After you fill out the identifier, you should be able to generate your App Password. Clicking the 'Generate' will show the following pop-up:

![](/assets/images/posts/finish_app_passwords.png)

Copy down the password given — even just to your clipboard. We'll just be needing it once, and don't have to remember or later use it.

## Step 5: Link your email addresses

App Password now in hand, you can navigate over to your email, and then to its settings area — a small gear icon on the top right for you if using Gmail. After clicking on 'Additional Settings', you should find a tab labelled 'Accounts and Import'. Click on it, and then scroll down to the 'Send mail as' section and select 'Add another email address'.

![](/assets/images/posts/custom_email_settings.png)

You'll now be presented with the 2000s-era UI I talked about earlier. It has a total of two parts, the first of which should appear as below:

![](/assets/images/posts/custom_email_substep_1.png)

Here, type in the name you want your custom email address to be associated with (likely just your name if a personal website, or some other variation like 'XYZ Helpdesk' should it be something else). Below that, fill out the *custom email* that you set up email forwarding for in Step 1. If not ticked, also check the 'Treat as alias' box as you do indeed want this email to be [an alias](https://support.google.com/a/answer/33327?hl=en#whatEmailAlias) of yours.

Once done, press 'Next Step'.

## Step 6: Add a server and authenticate

Almost at the finish line! All that's left is to set up the server that your mail will be routed through, and confirm that you are allowing this action. Fill out the fields that now appear as below:

![](/assets/images/posts/custom_email_substep_2.png)

- The 'SMTP Server' should be set to 'smtp.gmail.com' — you'll be using Gmails own servers to send and receive your emails. Its port should be set to 587.
- The 'Username' should be your full, non-custom email address, including the '@gmail.com' part. Gmail uses this and the field below it to authenticate that you are indeed granting access to it to send emails from your custom email address.
- The 'Password' should be the *App Password* you generated in Step 4 (not your Gmail password).
- Finally, the connection should be secured with TLS, recommended for being more secure than its older SSL counterpart.

Once done, press 'Save Changes' and you should be good to go! If you navigate back to the 'Accounts and Import' settings page, you should see both your custom and regular email addresses listed, and can even set one of them as the default one you'll use for sending emails in the future. Likewise, when you go to compose or reply to an email, you should see your custom email address as an option in the 'From' field.

![](/assets/images/posts/choosing_emails.png)

## Conclusion

I hope this post has been of use to you in saving some change on your personal, project, or business emails. If you have any questions, feel free to ask them in the comments below, or reach out to me at my own Gmail-hosted custom email address on the sidebar!
