import { customFetch, customFetchBody } from '@/components/utils/customFetch'
import { CustomFetchBaseResponse } from '@/components/utils/customFetch/interface'

export interface ForgotPasswordRequest {
  phone_number: string
}

export interface VerifyOTPRequest {
  phone_number: string
  firebase_uid: string
  session_id: string
}

export interface ResetPasswordRequest {
  phone_number: string
  session_id: string
  new_password: string
  confirm_password: string
}

export interface ForgotPasswordResponse extends CustomFetchBaseResponse {
  contents?: {
    data?: {
      session_id: string
    }
  }
}

export interface VerifyOTPResponse extends CustomFetchBaseResponse {
  contents?: any
}

export interface ResetPasswordResponse extends CustomFetchBaseResponse {
  contents?: any
}

export const forgotPasswordApi = {
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
}
