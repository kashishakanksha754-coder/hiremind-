'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ChevronRight, Download, Phone, Mail, MapPin, Briefcase,
  GraduationCap, Star, MessageSquare, Clock, CheckCircle,
  XCircle, PauseCircle, UserPlus, ChevronDown, ChevronUp,
  FileText, Mic, BarChart2, Video, Send
} from 'lucide-react'
import Link from 'next/link'

const STAGE_RESULTS = [
  {
    stage: 'cv_screening',
    label: 'CV Screening',
    status: 'completed',
    scoreOverall: 87,
    completedAt: '2024-01-15',
    aiSummary: 'Strong candidate with 5 years of React/TypeScript experience. Excellent skill match (92%) for required technologies. Previous experience at Razorpay and Swiggy is highly relevant. Minor gap: limited GraphQL exposure.',
    scoreBreakdown: [
      { label: 'Skills Match', score: 92, max: 100 },
      { label: 'Experience Fit', score: 85, max: 100 },
      { label: 'Education', score: 80, max: 100 },
    ],
  },
  {
    stage: 'voice_interview',
    label: 'Voice Interview',
    status: 'completed',
    scoreOverall: 83,
    completedAt: '2024-01-17',
    aiSummary: 'Candidate demonstrated strong communication skills and clear technical thinking. Explained complex problems well. Shows genuine enthusiasm for the role. Slight nervousness at the start but warmed up quickly.',
    scoreBreakdown: [
      { label: 'Communication', score: 88, max: 100 },
      { label: 'Role Clarity', score: 82, max: 100 },
      { label: 'Culture Fit', score: 79, max: 100 },
    ],
  },
  {
    stage: 'assessment',
    label: 'Skill Assessment',
    status: 'completed',
    scoreOverall: 91,
    completedAt: '2024-01-19',
    aiSummary: 'Exceptional technical performance. Scored 95% on React/TypeScript MCQs. Short-answer responses showed deep understanding of state management and performance optimisation patterns.',
    scoreBreakdown: [
      { label: 'Technical MCQ', score: 95, max: 100 },
      { label: 'Short Answers', score: 87, max: 100 },
    ],
  },
]

const ACTIVITY_LOG = [
  { action: 'Applied to position', time: '2024-01-14 09:32', type: 'apply' },
  { action: 'CV Screening completed — Score: 87', time: '2024-01-15 11:04', type: 'ai' },
  { action: 'Moved to Voice Interview stage', time: '2024-01-15 14:20', type: 'recruiter' },
  { action: 'Interview link sent via email + WhatsApp', time: '2024-01-15 14:21', type: 'system' },
  { action: 'Voice Interview completed — Score: 83', time: '2024-01-17 16:45', type: 'ai' },
  { action: 'Assessment generated and sent', time: '2024-01-18 09:00', type: 'system' },
  { action: 'Assessment completed — Score: 91', time: '2024-01-19 13:22', type: 'ai' },
]

function ScoreBar({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = (score / max) * 100
  const color = score >= 85 ? 'from-green-500 to-emerald-400'
    : score >= 70 ? 'from-amber-500 to-yellow-400'
    : 'from-red-500 to-orange-400'
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#94A3B8]">{label}</span>
        <span className="text-[#F1F5F9] font-semibold">{score}/{max}</span>
      </div>
      <div className="h-2 bg-[#1E2D45] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  )
}

function StageResultCard({ result }: { result: typeof STAGE_RESULTS[0] }) {
  const [expanded, setExpanded] = useState(false)
  const scoreColor = result.scoreOverall >= 85 ? 'text-green-400' : result.scoreOverall >= 70 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="bg-[#0D1526] border border-[#1E2D45] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="font-semibold text-[#F1F5F9]">{result.label}</span>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Completed</Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xl font-bold ${scoreColor}`}>{result.scoreOverall}</span>
          <span className="text-[#94A3B8] text-sm">/ 100</span>
          {expanded ? <ChevronUp className="h-4 w-4 text-[#94A3B8]" /> : <ChevronDown className="h-4 w-4 text-[#94A3B8]" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#1E2D45]">
          <div className="mt-4 space-y-3">
            {result.scoreBreakdown.map(b => (
              <ScoreBar key={b.label} {...b} />
            ))}
          </div>
          <div className="mt-4 p-3 bg-[#080C14] rounded-lg">
            <p className="text-xs text-[#94A3B8] mb-1 font-semibold uppercase tracking-wide">AI Summary</p>
            <p className="text-sm text-[#F1F5F9] leading-relaxed">{result.aiSummary}</p>
          </div>
          <p className="text-xs text-[#94A3B8] mt-2">Completed: {result.completedAt}</p>
        </div>
      )}
    </div>
  )
}

export default function CandidateDetailPage() {
  const params = useParams()
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([
    { content: 'Strong cultural fit — mentioned interest in fintech during voice interview.', author: 'Riya Kapoor', time: '2024-01-17' },
  ])

  const compositeScore = Math.round(STAGE_RESULTS.reduce((acc, r) => acc + r.scoreOverall, 0) / STAGE_RESULTS.length)

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-6">
        <Link href="/dashboard/jobs" className="hover:text-[#F1F5F9] transition-colors">Jobs</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/dashboard/jobs/${params.id}`} className="hover:text-[#F1F5F9] transition-colors">Senior Frontend Developer</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-[#F1F5F9]">Priya Sharma</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Candidate header */}
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
                PS
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F1F5F9]">Priya Sharma</h2>
                <p className="text-[#94A3B8]">Senior Frontend Developer</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Mail className="h-4 w-4" /> priya.sharma@example.com
              </div>
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <MapPin className="h-4 w-4" /> Bengaluru, India
              </div>
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Briefcase className="h-4 w-4" /> 5 years experience
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E2D45]">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  {compositeScore}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1">Composite Score</div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                <CheckCircle className="h-4 w-4 mr-2" /> Advance to Deep Interview
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="border-[#1E2D45] text-[#94A3B8] hover:text-amber-400 hover:border-amber-500/50 text-sm">
                  <PauseCircle className="h-4 w-4 mr-1" /> Hold
                </Button>
                <Button variant="outline" className="border-[#1E2D45] text-[#94A3B8] hover:text-red-400 hover:border-red-500/50 text-sm">
                  <XCircle className="h-4 w-4 mr-1" /> Reject
                </Button>
              </div>
              <Button variant="outline" className="w-full border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]">
                <UserPlus className="h-4 w-4 mr-2" /> Add to Talent Pool
              </Button>
              <Button variant="outline" className="w-full border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]">
                <Download className="h-4 w-4 mr-2" /> Download CV
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5">
            <h3 className="font-semibold text-[#F1F5F9] mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Docker', 'AWS'].map(skill => (
                <span key={skill} className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-md text-xs text-blue-400">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5">
            <h3 className="font-semibold text-[#F1F5F9] mb-3">Activity Log</h3>
            <div className="space-y-3">
              {ACTIVITY_LOG.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-[#F1F5F9]">{log.action}</p>
                    <p className="text-xs text-[#94A3B8]">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stage Results */}
          <div>
            <h3 className="font-semibold text-[#F1F5F9] mb-3">Stage Results</h3>
            <div className="space-y-3">
              {STAGE_RESULTS.map(result => (
                <StageResultCard key={result.stage} result={result} />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5">
            <h3 className="font-semibold text-[#F1F5F9] mb-4">Recruiter Notes</h3>
            <div className="space-y-3 mb-4">
              {notes.map((n, i) => (
                <div key={i} className="p-3 bg-[#0D1526] rounded-lg border border-[#1E2D45]">
                  <p className="text-sm text-[#F1F5F9]">{n.content}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">{n.author} · {n.time}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a private note about this candidate..."
                className="flex-1 p-3 bg-[#0D1526] border border-[#1E2D45] rounded-lg text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500/50 resize-none h-20"
              />
            </div>
            <Button
              onClick={() => {
                if (note.trim()) {
                  setNotes([...notes, { content: note, author: 'You', time: new Date().toISOString().split('T')[0] }])
                  setNote('')
                }
              }}
              className="mt-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white"
            >
              <Send className="h-4 w-4 mr-2" /> Add Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
