# AI Features Setup Guide

## Overview

CadastRAR now includes AI-powered features to enhance user management:

1. **AI-Generated Descriptions** - Automatically create professional user descriptions using Google Gemini AI
2. **PDF Document Generation** - Export user data as ID cards, certificates, or profile sheets

## Prerequisites

- Node.js 18+ installed
- Firebase project configured
- Google Gemini API key

## Setup Instructions

### 1. Get Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### 2. Configure Environment Variables

1. Open `/frontend/.env` file
2. Add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

3. Save the file

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## Features Usage

### AI Description Generator

1. Navigate to "Register New User" page (`/posts/create`)
2. Fill in the **Name** and **Tags** fields
3. Click the **"Generate with AI"** button (✨ icon)
4. The AI will automatically create a professional description based on the name and tags
5. You can edit the generated description if needed

**Example:**
- Name: "John Smith"
- Tags: "developer, react, typescript"
- Generated: "John Smith is a skilled professional with expertise in developer, react, and typescript. With a passion for technology and innovation..."

### PDF Document Generation

1. Navigate to any user's detail page
2. Scroll to the **"Generate Documents"** section
3. Click one of three options:
   - **ID Card** - Compact business card format (85.6mm x 53.98mm)
   - **Certificate** - Formal certificate of registration (A4 landscape)
   - **Profile Sheet** - Detailed profile document (A4 portrait)
4. The PDF will download automatically

## Document Templates

### ID Card
- Credit card size format
- Contains: Name, Tags, Registration Date
- Perfect for: Physical badges, access cards

### Certificate
- Professional certificate layout
- Contains: Name, Description, Tags, Date, Certification text
- Perfect for: Formal recognition, achievements

### Profile Sheet
- Comprehensive profile document
- Contains: All user information in organized sections
- Perfect for: Records, archives, detailed profiles

## Troubleshooting

### AI Features Not Working

**Issue:** "AI feature not configured" error

**Solution:**
1. Verify `VITE_GEMINI_API_KEY` is set in `.env`
2. Ensure the key is not the placeholder text
3. Restart the development server after adding the key

### PDF Generation Fails

**Issue:** PDF download doesn't start

**Solution:**
1. Check browser console for errors
2. Ensure all required user data (name, tags, description) is filled
3. Try a different browser (Chrome/Firefox recommended)

### API Rate Limits

**Issue:** "Too many requests" error

**Solution:**
- Google Gemini free tier has rate limits
- Wait a few minutes before generating more descriptions
- Consider upgrading to paid tier for higher limits

## API Costs

### Google Gemini (Free Tier)
- 60 requests per minute
- 1,500 requests per day
- **Cost:** FREE

For production use, consider:
- Monitoring API usage
- Implementing request caching
- Upgrading to paid tier if needed

## Technical Details

### AI Service (`src/services/gemini.ts`)
- Uses Google Generative AI SDK (`@google/generative-ai`)
- Model: `gemini-pro`
- Configurable prompts for different use cases

### PDF Generator (`src/utils/pdfGenerator.ts`)
- Uses `jspdf` for PDF creation
- Supports custom styling and branding
- Optimized for print and digital viewing

## Security Notes

⚠️ **Important:**
- Never commit `.env` files to version control
- Keep your API keys secure
- Rotate keys if accidentally exposed
- Use environment-specific keys (dev/staging/prod)

## Future Enhancements

Planned features:
- [ ] Batch document generation
- [ ] Custom template editor
- [ ] AI-powered tag suggestions
- [ ] Multi-language support
- [ ] Document watermarks
- [ ] QR code integration

## Support

For issues or questions:
1. Check this documentation
2. Review console errors
3. Verify all environment variables
4. Check Firebase configuration

---

**Version:** 1.0.0
**Last Updated:** January 2025
