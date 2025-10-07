'use client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function serverImageLoader({ src }: { src: string }) {
  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not set in serverImageLoader.')
    return src
  }

  const url = new URL(`${API_BASE_URL}${src}`)

  return url.toString()
}
