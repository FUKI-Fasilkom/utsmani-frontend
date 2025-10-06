'use client'

import { useEffect, useState } from 'react'

interface YouTubeVideoData {
  title: string
  embed_code: string
}

export function YouTubeSection() {
  const [videoData, setVideoData] = useState<YouTubeVideoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [_, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/homepage/youtube-video/`,
          { next: { revalidate: 60 } }
        )

        if (!response.ok) {
          throw new Error(
            `Failed to fetch YouTube video data: ${response.status}`
          )
        }

        const data = (await response.json()) as YouTubeVideoData
        setVideoData(data)
      } catch (error) {
        console.error('Error fetching YouTube video data:', error)
        setError('Failed to load video')
      } finally {
        setLoading(false)
      }
    }

    fetchVideoData()
  }, [])

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything if there's no embed code
  if (!loading && (!videoData || !videoData.embed_code)) {
    return null
  }

  return (
    <section className="pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="aspect-video w-full bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="animate-pulse">Loading video...</div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#75482f] mb-6">
                Video YouTube
              </h2>
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                {isClient && videoData?.embed_code ? (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeEmbedCode(videoData.embed_code),
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="animate-pulse">Loading video...</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

// Basic sanitization function to help prevent XSS
function sanitizeEmbedCode(embedCode: string): string {
  // Only allow YouTube embeds
  if (
    !embedCode.includes('youtube.com/embed/') &&
    !embedCode.includes('youtu.be/')
  ) {
    console.warn('Non-YouTube embed code detected and blocked')
    return ''
  }

  // Make sure it's an iframe
  if (!embedCode.startsWith('<iframe') || !embedCode.endsWith('</iframe>')) {
    console.warn('Invalid embed code format detected')
    return ''
  }

  // Add responsive styling if not present
  if (!embedCode.includes('width="100%"')) {
    embedCode = embedCode.replace(/width="(\d+)"/, 'width="100%"')
  }

  if (!embedCode.includes('height="100%"')) {
    embedCode = embedCode.replace(/height="(\d+)"/, 'height="100%"')
  }

  return embedCode
}
