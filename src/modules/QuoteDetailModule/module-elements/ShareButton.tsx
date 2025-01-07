'use client'

import { Button } from '@/components/ui/button'
import { FaShareAlt } from 'react-icons/fa'
import { toast } from '@/components/ui/sonner'

export const ShareButton = () => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <Button
      onClick={handleShare}
      className="bg-gradient-to-r from-[#A0653C] to-[#C99A71] rounded-full size-[60px] grid place-items-center"
    >
      <FaShareAlt className="fill-white size-6" />
    </Button>
  )
}
