---
title: Contact
permalink: /contact/
layout: single
excerpt: Contact Simon Ilincev easily through this page with a message and your email address.
---
For work enquiries, general questions, or queries about projects you can contact me at **[simon [at] simonilincev [dot] com](mailto:simon@simonilincev.com)** (preferred) or fill out the form below.

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea, input[type=email] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
</head>
<body>

<div class="container">
  <form action="https://formspree.io/meqrnpae" method="POST">
    <label for="fname">Full Name</label>
    <input type="text" id="name" name="name">
    <label for="lname">Email Address</label>
    <input type="email" id="lname" name="_replyto">
    <label for="subject">Message</label>
    <textarea id="subject" name="subject" style="height:200px"></textarea>
    <center><input type="submit" value="Send"></center>
  </form>
</div>

</body>
</html>
