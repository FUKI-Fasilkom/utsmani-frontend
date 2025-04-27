import { Education } from '../RegisterModule/interface'

export interface CertificateProps {
  title: string
  certificate_images: string[]
  report_files: string[] | null
  obtained_at: string
}

export interface CertificateSectionProps {
  certificates: CertificateProps[]
}

export interface PersonalDataSectionProps {
  fullname: string
  email: string
  phone_number: string
  address: string
  education_level: string
  gender: 'MALE' | 'FEMALE'
  educationList: Education[]
  profile_picture: string
}
