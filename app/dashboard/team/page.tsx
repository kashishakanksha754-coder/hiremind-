'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { UserPlus, Trash2, Crown, Send } from 'lucide-react'

const TEAM = [
  { id: '1', name: 'Riya Kapoor', email: 'riya@acmecorp.com', role: 'admin', avatar: 'RK', joinedAt: 'Jan 1, 2024' },
  { id: '2', name: 'Ankit Sharma', email: 'ankit@acmecorp.com', role: 'recruiter', avatar: 'AS', joinedAt: 'Jan 10, 2024' },
  { id: '3', name: 'Pooja Nair', email: 'pooja@acmecorp.com', role: 'recruiter', avatar: 'PN', joinedAt: 'Jan 15, 2024' },
]

export default function TeamPage() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('recruiter')
  const [invited, setInvited] = useState(false)

  function handleInvite() {
    if (!email) return
    setInvited(true)
    setEmail('')
    setTimeout(() => setInvited(false), 3000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-6">Team Management</h1>

      {/* Invite */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-[#F1F5F9] mb-4 flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-400" /> Invite a Team Member
        </h2>
        <div className="flex gap-3">
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="colleague@company.com"
            className="flex-1 bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9] placeholder-[#94A3B8]" />
          <select value={role} onChange={e => setRole(e.target.value)}
            className="bg-[#0D1526] border border-[#1E2D45] text-[#F1F5F9] rounded-md px-3 py-2 text-sm focus:outline-none">
            <option value="recruiter">Recruiter</option>
            <option value="admin">Admin</option>
          </select>
          <Button onClick={handleInvite} className="bg-gradient-to-r from-blue-500 to-violet-500 text-white whitespace-nowrap">
            <Send className="h-4 w-4 mr-2" /> {invited ? 'Sent!' : 'Invite'}
          </Button>
        </div>
        {invited && <p className="text-green-400 text-sm mt-2">✓ Invite sent successfully</p>}
      </div>

      {/* Members */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#1E2D45]">
          <h2 className="font-semibold text-[#F1F5F9]">Members ({TEAM.length})</h2>
        </div>
        <div className="divide-y divide-[#1E2D45]">
          {TEAM.map((member, i) => (
            <motion.div key={member.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#F1F5F9]">{member.name}</p>
                    {member.role === 'admin' && <Crown className="h-3.5 w-3.5 text-amber-400" />}
                  </div>
                  <p className="text-sm text-[#94A3B8]">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={member.role === 'admin'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}>
                  {member.role}
                </Badge>
                <span className="text-xs text-[#94A3B8]">{member.joinedAt}</span>
                {member.role !== 'admin' && (
                  <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
