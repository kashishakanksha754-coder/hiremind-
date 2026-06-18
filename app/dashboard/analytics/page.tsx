'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, Users, Clock, Target, ChevronDown } from 'lucide-react'

const JOBS = [
  { id: '1', title: 'Senior Frontend Developer' },
  { id: '2', title: 'Backend Engineer - Python' },
  { id: '3', title: 'Product Manager' },
]

const FUNNEL_DATA = [
  { stage: 'Applied', count: 148, color: 'from-blue-500 to-blue-400' },
  { stage: 'CV Screening', count: 98, color: 'from-blue-500 to-violet-400' },
  { stage: 'Voice Interview', count: 42, color: 'from-violet-500 to-violet-400' },
  { stage: 'Assessment', count: 28, color: 'from-violet-500 to-cyan-400' },
  { stage: 'Deep Interview', count: 14, color: 'from-cyan-500 to-cyan-400' },
  { stage: 'Selection', count: 6, color: 'from-green-500 to-green-400' },
  { stage: 'Hired', count: 2, color: 'from-emerald-500 to-emerald-400' },
]

const STAGE_TABLE = [
  { stage: 'CV Screening', total: 98, passed: 42, rejected: 48, avgScore: 74, avgDays: 1.2 },
  { stage: 'Voice Interview', total: 42, passed: 28, rejected: 11, avgScore: 79, avgDays: 2.4 },
  { stage: 'Assessment', total: 28, passed: 14, rejected: 12, avgScore: 81, avgDays: 1.8 },
  { stage: 'Deep Interview', total: 14, passed: 6, rejected: 7, avgScore: 83, avgDays: 3.1 },
  { stage: 'Selection', total: 6, passed: 2, rejected: 4, avgScore: 88, avgDays: 2.0 },
]

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111827] border border-[#1E2D45] rounded-xl p-5 hover:border-blue-500/30 transition-all"
    >
      <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${color} mb-3`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-[#F1F5F9]">{value}</div>
      <div className="text-sm text-[#94A3B8] mt-0.5">{label}</div>
      {sub && <div className="text-xs text-green-400 mt-1">{sub}</div>}
    </motion.div>
  )
}

export default function AnalyticsPage() {
  const [selectedJob, setSelectedJob] = useState(JOBS[0].id)
  const maxCount = FUNNEL_DATA[0].count

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">Analytics</h1>
          <p className="text-[#94A3B8] mt-1">Pipeline performance and hiring insights</p>
        </div>
        <div className="relative">
          <select
            value={selectedJob}
            onChange={e => setSelectedJob(e.target.value)}
            className="appearance-none bg-[#111827] border border-[#1E2D45] text-[#F1F5F9] rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer"
          >
            {JOBS.map(j => (
              <option key={j.id} value={j.id}>{j.title}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8] pointer-events-none" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Applicants" value="148" sub="↑ 12 this week" color="from-blue-600 to-blue-500" />
        <StatCard icon={Target} label="Hired" value="2" sub="1.35% conversion" color="from-emerald-600 to-emerald-500" />
        <StatCard icon={Clock} label="Avg. Time to Hire" value="18 days" sub="↓ 3 days vs last month" color="from-violet-600 to-violet-500" />
        <StatCard icon={BarChart2} label="Avg. Composite Score" value="81" sub="Across all stages" color="from-amber-600 to-amber-500" />
      </div>

      {/* Funnel */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-[#F1F5F9] mb-6">Hiring Funnel</h2>
        <div className="space-y-3">
          {FUNNEL_DATA.map((row, i) => {
            const pct = (row.count / maxCount) * 100
            const passRate = i < FUNNEL_DATA.length - 1
              ? Math.round((FUNNEL_DATA[i + 1].count / row.count) * 100)
              : null
            return (
              <div key={row.stage} className="flex items-center gap-4">
                <div className="w-32 text-sm text-[#94A3B8] text-right flex-shrink-0">{row.stage}</div>
                <div className="flex-1 h-8 bg-[#0D1526] rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-lg bg-gradient-to-r ${row.color} flex items-center justify-end pr-3`}
                  >
                    <span className="text-white text-xs font-bold">{row.count}</span>
                  </motion.div>
                </div>
                {passRate !== null && (
                  <div className="w-16 text-xs text-[#94A3B8] flex-shrink-0">
                    {passRate}% pass
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stage table */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-xl overflow-hidden">
        <div className="p-5 border-b border-[#1E2D45]">
          <h2 className="text-lg font-semibold text-[#F1F5F9]">Stage Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1E2D45]">
                {['Stage', 'Total', 'Passed', 'Rejected', 'Avg Score', 'Avg Days'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[#94A3B8] font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAGE_TABLE.map((row, i) => (
                <tr key={row.stage} className={`border-b border-[#1E2D45]/50 hover:bg-white/5 transition-colors ${i === STAGE_TABLE.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-3 text-[#F1F5F9] font-medium">{row.stage}</td>
                  <td className="px-5 py-3 text-[#F1F5F9]">{row.total}</td>
                  <td className="px-5 py-3 text-green-400">{row.passed}</td>
                  <td className="px-5 py-3 text-red-400">{row.rejected}</td>
                  <td className="px-5 py-3">
                    <span className={`font-semibold ${row.avgScore >= 80 ? 'text-green-400' : row.avgScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                      {row.avgScore}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#94A3B8]">{row.avgDays}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
