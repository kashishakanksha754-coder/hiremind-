'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Building2, Mail, Users, Bell, Upload, Plus, Edit2, Trash2, Send } from 'lucide-react'

const TABS = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'emails', label: 'Email Templates', icon: Mail },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

const EMAIL_TEMPLATES = [
  { trigger: 'application_received', label: 'Application Received', subject: 'We received your application for {{job_title}}' },
  { trigger: 'cv_passed', label: 'CV Screening Passed', subject: 'Your CV has been reviewed — next steps at {{company_name}}' },
  { trigger: 'cv_rejected', label: 'CV Screening Rejected', subject: 'Update on your application at {{company_name}}' },
  { trigger: 'voice_invite', label: 'Voice Interview Invite', subject: 'Schedule your AI voice interview for {{job_title}}' },
  { trigger: 'assessment_invite', label: 'Assessment Invite', subject: 'Complete your skill assessment for {{job_title}}' },
  { trigger: 'deep_interview_invite', label: 'Deep Interview Invite', subject: 'You\'re invited for a deep interview with {{company_name}}' },
  { trigger: 'selected', label: 'Candidate Selected', subject: 'Congratulations! Exciting news about your application' },
  { trigger: 'rejected', label: 'Final Rejection', subject: 'Update on your application at {{company_name}}' },
]

const TEAM_MEMBERS = [
  { name: 'Riya Kapoor', email: 'riya@acme.com', role: 'admin', joinedAt: '2024-01-01' },
  { name: 'Ankit Sharma', email: 'ankit@acme.com', role: 'recruiter', joinedAt: '2024-01-10' },
  { name: 'Pooja Nair', email: 'pooja@acme.com', role: 'recruiter', joinedAt: '2024-01-15' },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('company')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('recruiter')
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null)
  const [company, setCompany] = useState({
    name: 'Acme Corp',
    industry: 'Technology',
    size: '51-200',
    website: 'https://acme.com',
    about: 'We build amazing products that help businesses grow faster.',
  })

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#F1F5F9] mb-6">Settings</h1>

      {/* Tab nav */}
      <div className="flex gap-1 bg-[#0D1526] p-1 rounded-lg mb-6 w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg'
                : 'text-[#94A3B8] hover:text-[#F1F5F9]'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Company Profile */}
      {tab === 'company' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-6">
            <h2 className="font-semibold text-[#F1F5F9] mb-4">Company Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold">
                A
              </div>
              <Button variant="outline" className="border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]">
                <Upload className="h-4 w-4 mr-2" /> Upload Logo
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-[#94A3B8]">Company Name</Label>
                <Input value={company.name} onChange={e => setCompany({...company, name: e.target.value})}
                  className="bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9] mt-1" />
              </div>
              <div>
                <Label className="text-[#94A3B8]">Industry</Label>
                <Input value={company.industry} onChange={e => setCompany({...company, industry: e.target.value})}
                  className="bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9] mt-1" />
              </div>
              <div>
                <Label className="text-[#94A3B8]">Company Size</Label>
                <select value={company.size} onChange={e => setCompany({...company, size: e.target.value})}
                  className="w-full mt-1 bg-[#0D1526] border border-[#1E2D45] text-[#F1F5F9] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50">
                  {['1-10','11-50','51-200','201-500','501-1000','1000+'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label className="text-[#94A3B8]">Website</Label>
                <Input value={company.website} onChange={e => setCompany({...company, website: e.target.value})}
                  className="bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9] mt-1" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-[#94A3B8]">About</Label>
                <textarea value={company.about} onChange={e => setCompany({...company, about: e.target.value})}
                  className="w-full mt-1 bg-[#0D1526] border border-[#1E2D45] text-[#F1F5F9] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50 resize-none h-24" />
              </div>
            </div>
            <Button className="mt-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white">Save Changes</Button>
          </div>
        </motion.div>
      )}

      {/* Email Templates */}
      {tab === 'emails' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#1E2D45]">
              <p className="text-sm text-[#94A3B8]">Customise the emails sent to candidates at each stage of the pipeline.</p>
            </div>
            <div className="divide-y divide-[#1E2D45]">
              {EMAIL_TEMPLATES.map(tmpl => (
                <div key={tmpl.trigger} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div>
                    <p className="font-medium text-[#F1F5F9]">{tmpl.label}</p>
                    <p className="text-sm text-[#94A3B8] mt-0.5">{tmpl.subject}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTemplate(tmpl.trigger)}
                    className="border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]"
                  >
                    <Edit2 className="h-3 w-3 mr-1" /> Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Team */}
      {tab === 'team' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5">
            <h2 className="font-semibold text-[#F1F5F9] mb-4">Invite Team Member</h2>
            <div className="flex gap-3">
              <Input
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9]"
              />
              <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}
                className="bg-[#0D1526] border border-[#1E2D45] text-[#F1F5F9] rounded-md px-3 py-2 text-sm focus:outline-none">
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
              <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white whitespace-nowrap">
                <Send className="h-4 w-4 mr-2" /> Send Invite
              </Button>
            </div>
          </div>
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#1E2D45]">
              <h2 className="font-semibold text-[#F1F5F9]">Team Members</h2>
            </div>
            <div className="divide-y divide-[#1E2D45]">
              {TEAM_MEMBERS.map(member => (
                <div key={member.email} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-[#F1F5F9]">{member.name}</p>
                      <p className="text-sm text-[#94A3B8]">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={member.role === 'admin' ? 'bg-violet-500/10 text-violet-400 border-violet-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}>
                      {member.role}
                    </Badge>
                    {member.role !== 'admin' && (
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications */}
      {tab === 'notifications' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-[#111827] border border-[#1E2D45] rounded-xl divide-y divide-[#1E2D45]">
            {[
              { label: 'New application received', desc: 'When a candidate applies to any of your jobs' },
              { label: 'Stage completed', desc: 'When a candidate completes a stage (CV screening, interview, etc.)' },
              { label: 'Candidate stuck', desc: 'When a candidate has been in a stage for more than 3 days' },
              { label: 'Assessment submitted', desc: 'When a candidate submits their skill assessment' },
              { label: 'Interview completed', desc: 'When an AI voice or deep interview finishes' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium text-[#F1F5F9]">{item.label}</p>
                  <p className="text-sm text-[#94A3B8]">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#1E2D45] peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-violet-500 rounded-full peer transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
