// Environment variable validation and configuration
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_GEMINI_API_KEY'
] as const

type EnvVar = typeof requiredEnvVars[number]

interface AppConfig {
  supabase: {
    url: string
    anonKey: string
  }
  gemini: {
    apiKey: string
  }
  isDevelopment: boolean
  isProduction: boolean
}

function validateEnvVar(name: EnvVar): string {
  const value = process.env[name]
  
  if (!value) {
    console.error(`❌ Missing required environment variable: ${name}`)
    
    if (typeof window === 'undefined') {
      // Server-side: log error but don't throw to prevent build failure
      console.warn(`⚠️ Missing environment variable: ${name}`)
      return ''
    } else {
      // Client-side: show user-friendly error
      console.warn(`⚠️ App may not function properly without ${name}`)
      return ''
    }
  }
  
  return value
}

// Validate all required environment variables
const config: AppConfig = {
  supabase: {
    url: validateEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: validateEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  },
  gemini: {
    apiKey: validateEnvVar('NEXT_PUBLIC_GEMINI_API_KEY'),
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Log configuration status (without sensitive data)
if (typeof window === 'undefined') {
  console.log('🔧 Environment Configuration:')
  console.log(`   - Environment: ${process.env.NODE_ENV}`)
  console.log(`   - Supabase URL: ${config.supabase.url ? '✅ Set' : '❌ Missing'}`)
  console.log(`   - Supabase Key: ${config.supabase.anonKey ? '✅ Set' : '❌ Missing'}`)
  console.log(`   - Gemini API: ${config.gemini.apiKey ? '✅ Set' : '❌ Missing'}`)
}

export default config
