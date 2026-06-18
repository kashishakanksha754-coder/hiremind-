'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, MapPin, Briefcase, Plus, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const TALENT_POOL = [
  { id: '1', name: 'Kavya Reddy', title: 'Senior Frontend Developer', location: 'Bengaluru', experience: 6, skills: ['React', 'TypeScript', 'Next.js'], score: 94, tags: ['top-talent', 'react-expert'], addedAt: '2024-01-20' },
  { id: '2', name: 'Aditya Kumar', title: 'Lead Frontend Developer', location: 'Mumbai', experience: 8, skills: ['React', 'Vue', 'Node.js'], score: 89, tags: ['leadership'], addedAt: '2024-01-18' },
  { id: '3', name: 'Meera Iyer', title: 'Full Stack Engineer', location: 'Hyderabad', experience: 5, skills: ['Python', 'React', 'PostgreSQL'], score: 92, tags: ['full-stack'], addedAt: '2024-01-15' },
  { id: '4', name: 'Rohan Desai', title: 'Backend Engineer', location: 'Pune', experience: 4, skills: ['Python', 'FastAPI', 'Redis'], score: 85, tags: [], addedAt: '2024-01-10' },
]

export default function TalentPoolPage() {
  const [search, setSearch] = useState('')

  const filtered = TALENT_POOL.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Talent Pool</h1>
          <p className="text-[#94A3B8] mt-1">{TALENT_POOL.length} saved candidates</p>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input type="text" placeholder="Search by name, skill..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-[#1E2D45] rounded-lg text-sm text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500/50" />
        </div>
        <Button variant="outline" className="border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {filtered.map((candidate, i) => (
          <motion.div key={candidate.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  {candidate.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-[#F1F5F9]">{candidate.name}</h3>
                  <p className="text-sm text-[#94A3B8]">{candidate.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#94A3B8]">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {candidate.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {candidate.experience}y exp</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{candidate.score}</div>
                  <div className="text-xs text-[#94A3B8]">Score</div>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                  <Plus className="h-4 w-4 mr-1" /> Invite to Job
                </Button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {candidate.skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-400">{skill}</span>
              ))}
              {candidate.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-violet-500/10 border border-violet-500/30 rounded text-xs text-violet-400">
                  <Tag className="h-2.5 w-2.5" /> {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
