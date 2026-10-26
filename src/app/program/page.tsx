import { ProgramModule } from '@/modules'

// Render on request so the build does not depend on the API being up
export const dynamic = 'force-dynamic'

export default function Program() {
  return <ProgramModule />
}
