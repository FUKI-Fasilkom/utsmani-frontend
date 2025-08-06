'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Share2, Copy, Check } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { FaWhatsapp, FaFacebook, FaLine } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { toast } from 'sonner'

export const CTAButtons = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [pathname])

  const handleDonateClick = () => {
    const sanitizedPath = pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname
    const donatePath = `${sanitizedPath}/donate`
    router.push(donatePath)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    toast.success('Tautan berhasil disalin!')
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const shareText = encodeURIComponent(
    'Yukk berikan sedekah terbaikmu di sini!'
  )
  const encodedUrl = encodeURIComponent(currentUrl)

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`,
      icon: <FaWhatsapp size={24} />,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebook size={24} />,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Line',
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: <FaLine size={24} />,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`,
      icon: <FaXTwitter size={24} />,
      color: 'bg-neutral-800 hover:bg-neutral-900',
    },
  ]

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        className="h-10 md:text-lg md:h-12"
        variant={'secondary'}
        onClick={handleDonateClick}
      >
        Donasi Sekarang
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={'tertiary'}
            className="w-full h-10 md:text-lg md:h-12 flex text-brown self-center items-center gap-x-2"
          >
            <Share2 className="rotate-180 fill-brown w-5 h-5" />
            <span className="text-sm md:text-base">Bagikan</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bagikan Halaman Ini</DialogTitle>
          </DialogHeader>

          {/* Social Media Share Buttons */}
          <div className="grid grid-cols-4 gap-4 py-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center p-3 rounded-lg text-white transition-colors ${social.color}`}
                aria-label={`Share on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-sm text-center text-gray-500">
            Atau salin tautan di bawah ini
          </p>

          {/* Copy Link Section */}
          <div className="flex items-center space-x-2">
            <Input
              id="link"
              defaultValue={currentUrl}
              readOnly
              className="flex-grow"
            />
            <Button
              type="button"
              size="lg"
              className="px-3"
              variant={'secondary'}
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
