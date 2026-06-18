'use client'

import { useParams } from 'next/navigation'
import { InterviewRoom } from '@/components/interview/InterviewRoom'

export default function PortalInterviewPage() {
  const params = useParams()
  return <InterviewRoom />
}
