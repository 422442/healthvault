// Client-side email service using EmailJS
declare global {
  interface Window {
    emailjs: any;
  }
}

interface EmailConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

class EmailService {
  private config: EmailConfig
  private isInitialized: boolean = false

  constructor() {
    this.config = {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_a71xr7g',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_dknhziq',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'aCOiYJ-WKhyYTHrVr'
    }
  }

  private async initEmailJS(): Promise<boolean> {
    if (typeof window === 'undefined') return false
    
    if (this.isInitialized) return true

    try {
      // Load EmailJS script if not already loaded
      if (!window.emailjs) {
        await this.loadEmailJSScript()
      }

      if (this.config.publicKey && window.emailjs) {
        window.emailjs.init(this.config.publicKey)
        this.isInitialized = true
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error)
      return false
    }
  }

  private loadEmailJSScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src*="emailjs.com"]')) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load EmailJS script'))
      document.head.appendChild(script)
    })
  }

  async sendOTP(email: string, otp: string, purpose: 'registration' | 'login' | 'reset'): Promise<{ success: boolean; message: string }> {
    try {
      // Initialize EmailJS
      const initialized = await this.initEmailJS()
      if (!initialized) {
        return {
          success: false,
          message: 'Email service not configured. Please check EmailJS settings.'
        }
      }

      if (!this.config.serviceId || !this.config.templateId || !this.config.publicKey) {
        console.error('EmailJS configuration missing:', {
          serviceId: !!this.config.serviceId,
          templateId: !!this.config.templateId,
          publicKey: !!this.config.publicKey
        })
        return {
          success: false,
          message: 'Email service not configured. Please set up EmailJS credentials.'
        }
      }

      // Email content based on purpose
      const getEmailContent = (purpose: string, otp: string) => {
        switch (purpose) {
          case 'registration':
            return {
              subject: 'Verify Your HealthVault Account',
              title: 'Welcome to HealthVault!',
              message: 'Thank you for registering with HealthVault. To complete your registration, please verify your email address using the code below:',
              backgroundColor: '#667eea'
            }
          case 'login':
            return {
              subject: 'Your HealthVault Login Code',
              title: 'Login Verification',
              message: 'Someone is trying to sign in to your HealthVault account. If this was you, please use the code below to complete the login:',
              backgroundColor: '#059669'
            }
          case 'reset':
            return {
              subject: 'Reset Your HealthVault Password',
              title: 'Password Reset Request',
              message: 'You requested to reset your HealthVault password. Use the code below to proceed:',
              backgroundColor: '#dc2626'
            }
          default:
            return {
              subject: 'HealthVault Verification Code',
              title: 'Verification Code',
              message: 'Your HealthVault verification code is:',
              backgroundColor: '#667eea'
            }
        }
      }

      const content = getEmailContent(purpose, otp)

      // Template parameters for EmailJS
      const templateParams = {
        to_email: email,
        to_name: email.split('@')[0], // Use email username as name
        subject: content.subject,
        title: content.title,
        message: content.message,
        otp_code: otp,
        background_color: content.backgroundColor,
        app_name: 'HealthVault',
        app_url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        current_year: new Date().getFullYear()
      }

      console.log('Sending email with EmailJS:', {
        serviceId: this.config.serviceId,
        templateId: this.config.templateId,
        to: email,
        purpose
      })

      console.log('📧 Email Parameters:', {
        recipient: templateParams.to_email,
        subject: templateParams.subject,
        otpCode: templateParams.otp_code,
        purpose: purpose
      })

      console.log('⚠️  IMPORTANT: Make sure your EmailJS template "To Email" field is set to: {{to_email}}')
      console.log('⚠️  If emails are going to the wrong address, check your EmailJS template settings!')

      const response = await window.emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      )

      console.log('EmailJS response:', response)

      if (response.status === 200) {
        return {
          success: true,
          message: 'Email sent successfully'
        }
      } else {
        return {
          success: false,
          message: 'Failed to send email'
        }
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      return {
        success: false,
        message: 'Failed to send email. Please try again.'
      }
    }
  }
}

export const emailService = new EmailService()
