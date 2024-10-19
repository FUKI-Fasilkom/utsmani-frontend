import { CustomFetchBaseResponse } from '@/components/utils/customFetch/interface'
import { ReactNode } from 'react'

export interface AuthContextProviderProps {
  children: ReactNode
}

export interface AuthContextInterface {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  getUser: () => Promise<GetUserResponse | undefined>
}

export interface User {
  name?: string
  isOnboarded: boolean
  email?: string
  phone?: string
  line?: string
  gender?: 'MALE' | 'FEMALE'
  institution?: string
  provinceId?: string
  provinceName?: string
  cityId?: string
  cityName?: string
  knowFrom?: string
  interests?: { id: string; name: string }[]
  userPlayground: {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    username: string
    point: number
    score: number
    token: number
  }
  userEvents: {
    eventId: string
  }[]
  education?: string | null
  birthDate?: string | null
  discordId?: string
}

export interface UserResponseInterface extends User {
  code: number
  success: boolean
  message: string
}

export interface UserInterface {
  name: string
  isOnboarded: boolean
  email: string
  phone: string
  gender: string
  job: string
  institution: string
  province: string
  city: string
  knowFrom: string
  interests: string[]
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
}

export interface LoginResponse extends CustomFetchBaseResponse {
  accessToken: string
  user: User
}

export interface GetUserResponse extends CustomFetchBaseResponse, User {}
