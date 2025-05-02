interface Legalities {
  label: string
  value: string
}

interface SocialLink {
  platform: string
  label: string
  url: string
}

export interface AboutPageData {
  banner: string
  vision: string
  missions: string[]
  legalities: Legalities[]
  socialLinks: SocialLink[]
  mapEmbedUrl: string
  organizationStructure: string
}
