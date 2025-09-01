export interface Program {
  id: string
  title: string
  cover_image: string
}

export interface ProgramDetail extends Program {
  headline: string
  description: string
  min_registration_age: number
  max_registration_age: number
  education_level_requirement: object
  custom_fields: {
    levels?: {
      name: string
      description: string
    }[]
  } | null
}

interface Branch {
  id: string
  name: string
  cover_image: string
}

export interface Fee {
  category: string
  tier: string | null
  amount: number
}

interface ContactPerson {
  name: string
  phone: string
}

export interface BranchProgram {
  id: string
  branch: Branch
  fees: Fee[]
  contact_persons: ContactPerson[]
}

export interface UserRegistration {
  id: string
  branch_program: {
    id: string
    program: Program
    branch: Branch
  }
  batch_program: {
    id: string
    title: string
    description: string | null
  }
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED'
  created_at: string
}
