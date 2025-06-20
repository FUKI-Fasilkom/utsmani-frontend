import { customFetch, customFetchBody } from '@/components/utils/customFetch'
import { CustomFetchBaseResponse } from '@/components/utils/customFetch/interface'

interface ForgotPasswordRequest {
  phone_number: string
}

interface VerifyOTPRequest {
  phone_number: string
  firebase_uid: string
  session_id: string
}

interface ResetPasswordRequest {
  phone_number: string
  session_id: string
  new_password: string
  confirm_password: string
}

interface ForgotPasswordResponse extends CustomFetchBaseResponse {
  contents?: {
    data?: {
      session_id: string
    }
  }
}

interface VerifyOTPResponse extends CustomFetchBaseResponse {
  contents?: any
}

interface ResetPasswordResponse extends CustomFetchBaseResponse {
  contents?: any
}

export const authApi = {
  async forgotPassword(
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    return customFetch<ForgotPasswordResponse>('/auth/forgot-password/', {
      method: 'POST',
      body: customFetchBody(request),
    })
  },

  async verifyOTP(request: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    return customFetch<VerifyOTPResponse>('/auth/verify-otp/', {
      method: 'POST',
      body: customFetchBody(request),
    })
  },

  async resetPassword(
    request: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    return customFetch<ResetPasswordResponse>('/auth/reset-password/', {
      method: 'POST',
      body: customFetchBody(request),
    })
  },

  async login(
    username: string,
    password: string
  ): Promise<CustomFetchBaseResponse> {
    return customFetch('/auth/login/', {
      method: 'POST',
      body: customFetchBody({
        username,
        password,
      }),
    })
  },

  async register(userData: {
    username: string
    fullname: string
    phone_number: string
    address: string
    education_level?: number
    gender: 'MALE' | 'FEMALE'
    password: string
    birthdate?: string
  }): Promise<CustomFetchBaseResponse> {
    return customFetch('/auth/register/', {
      method: 'POST',
      body: customFetchBody(userData),
    })
  },

  async refreshToken(refreshToken: string): Promise<CustomFetchBaseResponse> {
    return customFetch('/auth/refresh/', {
      method: 'POST',
      body: customFetchBody({
        refresh: refreshToken,
      }),
    })
  },

  async getProfile(_accessToken: string): Promise<CustomFetchBaseResponse> {
    return customFetch('/auth/profile/', {
      isAuthorized: true,
    })
  },
}

export type {
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
  ForgotPasswordResponse,
  VerifyOTPResponse,
  ResetPasswordResponse,
}
