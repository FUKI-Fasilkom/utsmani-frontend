export interface Fee {
  category: string
  tier: string | null
  amount: number
}

export interface Branch {
  branch_program_id: string
  branch: {
    id: string
    title: string
    location: string | null
  }
  fees: Fee[]
}

export type UserStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | null

export interface ProgramDetailProps {
  id: string
  branches: Branch[]
  title: string
  cover_image: string
  headline: string
  description: string
  min_registration_age: number
  max_registration_age: number
  education_level_requirement: object
  cp_name_1: string
  cp_name_2: string
  cp_wa_number_1: string
  cp_wa_number_2: string
  user_status: UserStatus
  custom_fields: {
    levels?: {
      name: string
      description: string
    }[]
  } | null
}
export interface ProgramDetailModuleProps {
  id: string
}
export interface ProgramProps {
  id: string
  title: string
  cover_image: string
}
