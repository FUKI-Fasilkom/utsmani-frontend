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
