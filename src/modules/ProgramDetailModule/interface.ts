export interface ProgramDetailProps {
  id: string
  branch: string
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
  user_status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | null
}
export interface ProgramDetailModuleProps {
  id: string
}
export interface ProgramProps {
  id: string
  title: string
  cover_image: string
}
