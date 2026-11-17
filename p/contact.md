---
title: Email me
description: "Send Jerry an email."
---

Use this form to send me a message. This site never publishes an email address, so the form is the only way in.

The form only works once the site is deployed on Netlify, which detects it at build time and collects submissions in the Netlify dashboard. Opened locally, it does nothing.

<form name="contact" method="POST" action="/p/thanks" data-netlify="true" netlify-honeypot="bot-field">
<input type="hidden" name="form-name" value="contact">
<p hidden><label>Don't fill this out if you're human: <input name="bot-field"></label></p>
<p>
<label for="name">Name</label>
<input type="text" id="name" name="name" required>
</p>
<p>
<label for="email">Email</label>
<input type="email" id="email" name="email" required pattern="\s*[^@\s]+@[^@\s]+\.[^@\s]{2,}\s*" title="Enter a full email address, like name@example.com">
</p>
<p>
<label for="message">Message</label>
<textarea id="message" name="message" rows="6" required></textarea>
</p>
<p>
<button type="submit">Send</button>
</p>
</form>

[Back home](/)
