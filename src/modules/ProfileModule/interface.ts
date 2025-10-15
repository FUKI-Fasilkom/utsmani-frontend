export enum ProfileTab {
  Profile = 'profile',
  Certificates = 'certificates',
  Registrations = 'registrations',
}

// For Certificate Section
export interface Certificate {
  id: string
  title: string
  type: 'CERTIFICATE' | 'REPORT'
  recipient_name: string
  file_url: string
  issued_at: string
}

// For Personal Data Section
export interface UserProfile {
  fullname: string
  username: string
  email: string | null
  is_email_verified: boolean
  phone_number: string
  is_phone_number_verified: boolean
  address: string
  profile_picture: string | null
  education_level: string
  gender: 'MALE' | 'FEMALE'
  birthdate: string | null
}

// For Registration History Section
export interface ProgramInfo {
  id: string
  title: string
  cover_image: string
}

export interface BranchInfo {
  id: string
  name: string
  cover_image: string
}

export interface ContactPerson {
  id: string
  name: string
  phone: string
}

export interface BranchProgramInfo {
  id: string
  program: ProgramInfo
  branch: BranchInfo
  contact_persons: ContactPerson[]
}

export interface BatchProgramInfo {
  id: string
  title: string
  description: string | null
  is_active: boolean
}

export interface UserRegistration {
  id: string
  branch_program: BranchProgramInfo
  batch_program: BatchProgramInfo
  created_at: string
  updated_at: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  user: number
}
