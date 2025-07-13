# 🔧 Google OAuth Setup Guide

## Current Issue: Google OAuth Timeout
The error shows: `outgoing request timed out after 3500ms`

## ✅ Steps to Fix Google OAuth:

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Select your project (or create a new one)

### 2. Enable Google+ API (Required for NextAuth)
- Go to "APIs & Services" > "Library"
- Search for "Google+ API" 
- Click "ENABLE" (this is often missed!)

### 3. Configure OAuth Consent Screen
- Go to "APIs & Services" > "OAuth consent screen"
- Choose "External" (for testing)
- Fill in required fields:
  - App name: "Scribbly Blog"
  - User support email: your email
  - Developer contact: your email

### 4. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client ID"
- Application type: "Web application"
- Name: "Scribbly NextAuth"

### 5. **IMPORTANT: Set Correct Redirect URIs**
Add these EXACT URLs:
```
http://localhost:3000/api/auth/callback/google
http://127.0.0.1:3000/api/auth/callback/google
```

### 6. Add Test Users (Important!)
- Go back to "OAuth consent screen"
- Scroll down to "Test users"
- Add your email address as a test user

### 7. Set Environment Variables
Add your OAuth credentials to your `.env` file (never commit this file!):
```
GOOGLE_ID=your_google_client_id_here
GOOGLE_SECRET=your_google_client_secret_here
```

**⚠️ Security Note:** Never commit your actual credentials to version control!

## 🔍 Common Issues:
1. ❌ Forgot to enable Google+ API
2. ❌ Wrong redirect URI format
3. ❌ App in "Testing" mode without test users
4. ❌ Missing OAuth consent screen setup
