'use client'

import { ReactNode } from 'react'
import { ExternalToast, Toaster as Sonner, toast as toastSonner } from 'sonner'
import { CheckCircle2, AlertCircle } from 'lucide-react'

type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group flex toaster group justify-center"
      expand={true}
      toastOptions={{
        unstyled: true,
        classNames: {
          success:
            'bg-[#22A4B8] dark:bg-[#CEFAFF] border border-[#F3F0FE] dark:border-[#F3F0FE] dark:shadow-[0px_4px_10px_0px_#1DE4E4]',
          error: 'bg-[#F77278] dark:shadow-[0px_4px_10px_0px_#DB272F]',
          loading:
            'bg-[#0E191C] dark:bg-[#F7F5FE] shadow-[0px_4px_10px_0px_#F7F5FE]',
          info: 'bg-[#0E191C] dark:bg-[#F7F5FE] shadow-[0px_4px_10px_0px_#F7F5FE]',
          toast:
            'flex items-center gap-[10px] px-[25px] py-[10px] rounded-[15px] font-bold text-[#F3F0FE] dark:text-[#252525] font-sans shadow-[0px_4px_10px_0px_rgba(0,9,10,0.30)]',
          description:
            'group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400',
          actionButton:
            'group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900',
          cancelButton:
            'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400',
        },
      }}
      {...props}
    />
  )
}

export const toast = {
  ...toastSonner,
  success: (message: ReactNode, data: ExternalToast | undefined = {}) => {
    return toastSonner.success(message, {
      ...data,
      icon: <CheckCircle2 />,
    })
  },
  error: (message: ReactNode, data: ExternalToast | undefined = {}) => {
    return toastSonner.error(message, {
      ...data,
      icon: <AlertCircle />,
    })
  },
  message: (message: ReactNode, data: ExternalToast | undefined = {}) => {
    return toastSonner.message(message, {
      ...data,
      className:
        'bg-[#0E191C] dark:bg-[#F7F5FE] shadow-[0px_4px_10px_0px_#F7F5FE]',
    })
  },
}
