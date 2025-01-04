'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextInterface,
  AuthContextProviderProps,
  GetUserResponse,
  LoginResponse,
  User,
} from './interface'
import { customFetch, customFetchBody } from '@/components/utils/customFetch'
import { toast } from '@/components/ui/sonner'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({} as AuthContextInterface)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState({} as User)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  async function login({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    const response = await customFetch<LoginResponse>('/auth/login/', {
      method: 'POST',
      body: customFetchBody({
        username,
        password,
      }),
    })

    if (response.status === 200) {
      setIsAuthenticated(true)
      setCookie('AT', response.contents.access_token)
      return response
    } else {
      setUser({} as User)
      setIsAuthenticated(false)
      throw new Error(response.message)
    }
  }

  async function getUser() {
    try {
      const response = await customFetch<GetUserResponse>('/auth/profile/', {
        isAuthorized: true,
      })
      if (response.status === 200) {
        setUser(response.contents)
        setIsAuthenticated(true)
        return response
      } else if (response.code === 'token_not_valid') {
        toast.error('Silahkan login kembali!')
        setUser({} as User)
        setIsAuthenticated(false)
        router.push('/login')
      } else {
        toast.error(`Oops. User tidak ditemukan!`)
        setUser({} as User)
        setIsAuthenticated(false)
      }
    } catch (error) {
      toast.error(`Oops. User tidak ditemukan!`)
      setUser({} as User)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    const accessToken = getCookie('AT')
    if (accessToken) {
      getUser()
    }
  }, [])

  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    getUser,
    login,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
