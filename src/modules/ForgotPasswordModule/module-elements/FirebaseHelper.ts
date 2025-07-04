import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/components/utils'

export class FirebaseRecaptchaHelper {
  private recaptchaVerifier: RecaptchaVerifier | null = null

  initializeRecaptcha(): boolean {
    if (!this.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById('recaptcha-container')
      if (!recaptchaContainer) {
        console.error('reCAPTCHA container not found')
        return false
      }

      try {
        this.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible',
            callback: (response: any) => {
              console.log('reCAPTCHA solved:', response)
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired')
            },
          }
        )
        return true
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error)
        return false
      }
    }
    return true
  }

  async sendOTP(phoneNumber: string) {
    if (!this.initializeRecaptcha()) {
      throw new Error('Gagal inisialisasi reCAPTCHA')
    }

    const formattedPhone = `+62${phoneNumber.substring(1)}`

    // Add delay to ensure reCAPTCHA is ready
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return await signInWithPhoneNumber(
      auth,
      formattedPhone,
      this.recaptchaVerifier!
    )
  }

  cleanup(): void {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear()
      this.recaptchaVerifier = null
    }
  }
}
