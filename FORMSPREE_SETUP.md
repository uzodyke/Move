# Formspree Setup Instructions

To make your quote forms actually send email notifications to tigrexmove@gmail.com, follow these steps:

## Step 1: Create Formspree Account
1. Go to https://formspree.io/
2. Sign up with tigrexmove@gmail.com
3. Verify your email address

## Step 2: Create a New Form
1. Click "Create New Form"
2. Name it "Tigrex Move Quote Requests"
3. Copy the form endpoint URL (looks like: https://formspree.io/f/xpzgkqyw)

## Step 3: Update the Website
Replace "YOUR_FORM_ID" in these files with your actual Formspree form ID:

**In QuoteForm.tsx (line 53):**
```
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```
Change to:
```
const response = await fetch('https://formspree.io/f/xpzgkqyw', {
```

**In contact.astro (line 132):**
```
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-6">
```
Change to:
```
<form action="https://formspree.io/f/xpzgkqyw" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-6">
```

## Step 4: Test the Forms
1. Rebuild your website: `npm run build`
2. Serve it: `python3 -m http.server 8080 -d dist`
3. Submit a test quote form
4. Check your email inbox for notifications

## What You'll Receive
When someone submits a quote request, you'll get an email with:
- Customer's name, email, and phone
- Service type requested
- Moving from/to locations
- Preferred move date
- Property size
- Additional information

The email will have the subject line "New Quote Request from [Customer Name]" and will be set up to reply directly to the customer's email address.