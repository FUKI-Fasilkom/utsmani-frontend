export interface Props {}

export interface ProgramProps {
  id: string
  name: string
  cover_image: string
  title: string
}

export interface ProgramSectionProps {
  programs: ProgramProps[]
}

export interface ActivityProps {
  id: string
  title: string
  created_at: string
  updated_at: string
  type: string
  cover_image: string
  location: string
  activity_date: string
  dresscode: string
}

export interface ActivitySectionProps {
  activities: ActivityProps[]
}

export interface BranchProps {
  id: string
  title: string
}

export interface BranchSectionProps {
  branches: BranchProps[]
}
