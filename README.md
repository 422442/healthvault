# 🏥 HealthVault - Medical Records Management System

A modern, secure healthcare management platform built with Next.js, Supabase, and AI-powered features.

![HealthVault](https://img.shields.io/badge/HealthVault-v2.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Powered-green)

## ✨ Features

- 🔐 **Secure Authentication** with OTP-based login
- 👥 **Multi-role Support** (Patients & Doctors)
- 📱 **Responsive Design** for all devices
- 🤖 **AI-Powered Chat** using Google Gemini
- 📋 **Appointment Management** system
- 📊 **Medical Records** storage and retrieval
- 🔔 **Real-time Notifications**
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd healthvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and log in
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure project settings

3. **Set Environment Variables in Vercel**
   During deployment, Vercel will prompt you to set environment variables:

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
   | `NEXT_PUBLIC_GEMINI_API_KEY` | Your Google Gemini API key |

   If you skip this step during initial setup, you can add them later in your project's settings.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🏗️ Project Structure

```
healthvault/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── patient/           # Patient dashboard
│   ├── doctor/            # Doctor dashboard
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities and configuration
│   ├── supabase/         # Supabase client configuration
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `NODE_ENV` | ❌ | Environment (development/production) |

### Demo Accounts

For testing purposes, use these credentials:

- **Doctor Account**: `9876543210` (OTP: `123456`)
- **Patient Account**: Any other number (OTP: `123456`)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run build-check  # Full pre-deployment check
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Tailwind CSS** for styling

## 🔒 Security

- Environment variables validation
- Secure API key handling
- Row Level Security (RLS) with Supabase
- Input sanitization and validation
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Deployment Guide](./DEPLOYMENT.md)
2. Verify environment variables are set correctly
3. Check Vercel deployment logs
4. Ensure all dependencies are installed

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

Made with ❤️ for better healthcare management
