'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AuthContextInterface,
  AuthContextProviderProps,
  GetUserResponse,
  LoginResponse,
  User,
} from './interface'
import { useRouter, useSearchParams } from 'next/navigation'
import { customFetch, customFetchBody } from '@/components/utils/customFetch'
import { toast } from '@/components/ui/sonner'
import { getCookie, setCookie } from 'cookies-next'
import { useBaseUrlWithPath } from '@/components/hooks/useBaseUrlWithPath'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const developmentLock = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const fullUrl = useBaseUrlWithPath()

  const [user, setUser] = useState({} as User)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function login({ ticket }: { ticket: string }) {
    const response = await customFetch<LoginResponse>('/auth/login/', {
      method: 'POST',
      body: customFetchBody({
        ticket,
        service: fullUrl,
      }),
    })

    if (response.success) {
      setIsAuthenticated(true)
      setCookie('AT', response.accessToken)
      return response
    } else {
      setUser({} as User)
      setIsAuthenticated(false)
      throw Error()
    }
  }

  async function getUser() {
    try {
      const response = await customFetch<GetUserResponse>('/auth/user/', {
        isAuthorized: true,
      })

      if (response.success) {
        const { ...userInfo } = response

        setUser(userInfo)
        setIsAuthenticated(true)

        return response
      } else {
        toast.error(`Oops. User tidak ditemukan!`)
        setUser({} as User)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error(error)
      toast.error(`Oops. User tidak ditemukan!`)
      setUser({} as User)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    const token = getCookie('AT')
    setIsAuthenticated(!!token)

    if (!developmentLock.current || process.env.NODE_ENV === 'production') {
      if (searchParams.toString().includes('ticket') && !!fullUrl) {
        const ticket = searchParams.get('ticket')
        toast.promise(login({ ticket: ticket as string }), {
          loading: 'Logging in...',
          success: () => {
            router.refresh()
            return 'Login berhasil!'
          },
          error: (err) => `Oops. Login gagal! ${err.message}`,
        })
      } else if (token && !user?.email) {
        getUser()
      }
    }

    return () => {
      if (process.env.NODE_ENV !== 'production' && !!fullUrl) {
        developmentLock.current = true
      }
    }
  }, [searchParams, fullUrl])

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    getUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
