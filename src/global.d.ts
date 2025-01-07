export {}

declare global {
  interface Window {
    recaptchaVerifier: any // Ubah `any` ke tipe spesifik jika diperlukan
  }
}
