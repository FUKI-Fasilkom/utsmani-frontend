export interface CertificateProps {
  title: string
  certificate_image: string
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
}
