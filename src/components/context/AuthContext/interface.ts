import { CustomFetchBaseResponse } from '@/components/utils/customFetch/interface'
import { CertificateProps } from '@/modules/ProfileModule/interface'
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
  login: (credentials: {
    username: string
    password: string
  }) => Promise<LoginResponse>
}

export interface User {
  address: string
  certificates: CertificateProps
  education_level: string
  email: string
  fullname: string
  gender: 'MALE' | 'FEMALE'
  is_email_verified: boolean
  is_phone_number_verified: boolean
  phone_number: boolean
  profile_picture: string | null
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
  status: number
  message: string
  contents: {
    access_token: string
    refresh_token: string
    user: {
      id: number
      username: string
      fullname: string
    }
  }
}

export interface GetUserResponse extends CustomFetchBaseResponse {
  contents: User
  code: string
}
