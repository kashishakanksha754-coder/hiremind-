'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users, ChevronRight, ChevronDown, Clock, Star,
  Filter, Search, ArrowRight, X, CheckCircle,
  AlertCircle, MoreHorizontal, Plus
} from 'lucide-react'
import Link from 'next/link'

const STAGES = [
  { id: 'cv_screening', label: 'CV Screening', color: 'blue', count: 24 },
  { id: 'voice_interview', label: 'Voice Interview', color: 'violet', count: 12 },
  { id: 'assessment', label: 'Assessment', color: 'cyan', count: 8 },
  { id: 'deep_interview', label: 'Deep Interview', color: 'amber', count: 5 },
  { id: 'selection', label: 'Selection', color: 'green', count: 3 },
  { id: 'selected', label: 'Selected', color: 'emerald', count: 1 },
]

const STAGE_COLORS: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  green: 'bg-green-500/10 border-green-500/30 text-green-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
}

const MOCK_CANDIDATES: Record<string, Array<{id: string; name: string; score: number; daysInStage: number; title: string}>> = {
  cv_screening: [
    { id: '1', name: 'Priya Sharma', score: 87, daysInStage: 1, title: 'Senior Frontend Developer' },
    { id: '2', name: 'Rahul Verma', score: 72, daysInStage: 2, title: 'React Developer' },
    { id: '3', name: 'Ananya Singh', score: 91, daysInStage: 0, title: 'UI Engineer' },
    { id: '4', name: 'Karan Mehta', score: 65, daysInStage: 3, title: 'Frontend Developer' },
  ],
  voice_interview: [
    { id: '5', name: 'Deepika Nair', score: 83, daysInStage: 2, title: 'Senior Developer' },
    { id: '6', name: 'Arjun Patel', score: 78, daysInStage: 1, title: 'Full Stack Developer' },
  ],
  assessment: [
    { id: '7', name: 'Sneha Gupta', score: 88, daysInStage: 1, title: 'Frontend Engineer' },
    { id: '8', name: 'Vikram Joshi', score: 76, daysInStage: 2, title: 'React Developer' },
  ],
  deep_interview: [
    { id: '9', name: 'Meera Iyer', score: 92, daysInStage: 1, title: 'Senior Frontend Developer' },
  ],
  selection: [
    { id: '10', name: 'Aditya Kumar', score: 89, daysInStage: 2, title: 'Lead Frontend Developer' },
  ],
  selected: [
    { id: '11', name: 'Kavya Reddy', score: 94, daysInStage: 0, title: 'Senior Developer' },
  ],
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'text-green-400 bg-green-500/10 border-green-500/30'
    : score >= 70 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    : 'text-red-400 bg-red-500/10 border-red-500/30'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      <Star className="h-3 w-3" /> {score}
    </span>
  )
}

function CandidateCard({ candidate, jobId, stageId }: { candidate: any; jobId: string; stageId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D1526] border border-[#1E2D45] rounded-lg p-3 hover:border-blue-500/40 transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9]">{candidate.name}</p>
          <p className="text-xs text-[#94A3B8]">{candidate.title}</p>
        </div>
        <ScoreBadge score={candidate.score} />
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-[#94A3B8]">
          <Clock className="h-3 w-3" />
          {candidate.daysInStage === 0 ? 'Today' : `${candidate.daysInStage}d in stage`}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/dashboard/jobs/${jobId}/candidates/${candidate.id}`}>
            <button className="p-1 rounded text-blue-400 hover:bg-blue-500/10 transition-colors">
              <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
          <button className="p-1 rounded text-green-400 hover:bg-green-500/10 transition-colors" title="Advance">
            <CheckCircle className="h-3 w-3" />
          </button>
          <button className="p-1 rounded text-red-400 hover:bg-red-500/10 transition-colors" title="Reject">
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function JobPipelinePage() {
  const params = useParams()
  const jobId = params.id as string
  const [search, setSearch] = useState('')

  const totalCandidates = STAGES.reduce((acc, s) => acc + s.count, 0)

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#94A3B8] mb-2">
          <Link href="/dashboard/jobs" className="hover:text-[#F1F5F9] transition-colors">Jobs</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#F1F5F9]">Senior Frontend Developer</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9]">Senior Frontend Developer</h1>
            <p className="text-[#94A3B8] mt-1">Bengaluru · Remote · {totalCandidates} total applicants</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-blue-500/50">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/25">
              <Plus className="h-4 w-4 mr-2" /> Add Candidate
            </Button>
          </div>
        </div>

        {/* Stage stats */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {STAGES.map(stage => (
            <div key={stage.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${STAGE_COLORS[stage.color]}`}>
              <span>{stage.label}</span>
              <span className="font-bold">{stage.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4 w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-[#0D1526] border border-[#1E2D45] rounded-lg text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500/50"
        />
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {STAGES.map(stage => {
          const candidates = (MOCK_CANDIDATES[stage.id] || []).filter(c =>
            !search || c.name.toLowerCase().includes(search.toLowerCase())
          )
          return (
            <div key={stage.id} className="flex-shrink-0 w-64">
              <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-lg border ${STAGE_COLORS[stage.color]}`}>
                <span className="text-sm font-semibold">{stage.label}</span>
                <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded-full">{stage.count}</span>
              </div>
              <div className="flex flex-col gap-2">
                {candidates.map(candidate => (
                  <CandidateCard key={candidate.id} candidate={candidate} jobId={jobId} stageId={stage.id} />
                ))}
                {candidates.length === 0 && (
                  <div className="text-center py-8 text-[#94A3B8] text-sm border border-dashed border-[#1E2D45] rounded-lg">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
