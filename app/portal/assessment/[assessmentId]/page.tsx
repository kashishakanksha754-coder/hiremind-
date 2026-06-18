'use client'

import { useParams } from 'next/navigation'
import AssessmentRoom from '@/components/assessment/AssessmentRoom'

export default function PortalAssessmentPage() {
  const params = useParams()
  return <AssessmentRoom assessmentId={params.assessmentId as string} />
}
