import AssessmentRoom from '@/components/assessment/AssessmentRoom'

export default function PublicAssessmentPage({ params }: { params: { uuid: string } }) {
  return <AssessmentRoom assessmentId={params.uuid} />
}
