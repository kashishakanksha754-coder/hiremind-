import Link from 'next/link'
import { MapPin, Briefcase, Clock, ArrowRight, Globe, Users, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const MOCK_COMPANY = {
  name: 'Acme Corp',
  slug: 'acme',
  industry: 'Technology · SaaS',
  size: '201–500 employees',
  website: 'https://acme.com',
  about: 'We build developer tools that help engineering teams ship 10x faster. Founded in 2019, we are remote-first and backed by Sequoia and Y Combinator.',
  jobs: [
    { id: '1', title: 'Senior Frontend Developer', location: 'Bengaluru / Remote', workMode: 'Hybrid', type: 'Full-time', experience: '4–7 years', posted: '3 days ago' },
    { id: '2', title: 'Backend Engineer — Python', location: 'Remote (India)', workMode: 'Remote', type: 'Full-time', experience: '3–6 years', posted: '1 week ago' },
    { id: '3', title: 'Product Manager', location: 'Bengaluru', workMode: 'On-site', type: 'Full-time', experience: '5–8 years', posted: '2 weeks ago' },
    { id: '4', title: 'DevOps Engineer', location: 'Remote', workMode: 'Remote', type: 'Contract', experience: '3–5 years', posted: '5 days ago' },
  ],
}

const WORK_MODE_COLORS: Record<string, string> = {
  Remote: 'bg-green-500/10 text-green-400 border-green-500/30',
  Hybrid: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  'On-site': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
}

export default function CareersPage({ params }: { params: { company: string } }) {
  const company = MOCK_COMPANY

  return (
    <div className="min-h-screen bg-[#080C14]">
      {/* Header */}
      <div className="bg-[#0D1526] border-b border-[#1E2D45]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {company.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#F1F5F9]">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#94A3B8]">
                <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {company.industry}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {company.size}</span>
                <a href={company.website} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <Globe className="h-4 w-4" /> {company.website.replace('https://', '')}
                </a>
              </div>
              <p className="mt-3 text-[#94A3B8] max-w-2xl">{company.about}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-xl font-bold text-[#F1F5F9] mb-2">We're Hiring</h2>
        <p className="text-[#94A3B8] mb-6">{company.jobs.length} open positions</p>

        <div className="space-y-4">
          {company.jobs.map(job => (
            <div key={job.id}
              className="bg-[#111827] border border-[#1E2D45] rounded-xl p-6 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#F1F5F9] group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-[#94A3B8]">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.experience}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.posted}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge className={`border text-xs ${WORK_MODE_COLORS[job.workMode] || 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                      {job.workMode}
                    </Badge>
                    <Badge className="bg-[#1E2D45] text-[#94A3B8] border-[#1E2D45] text-xs">
                      {job.type}
                    </Badge>
                  </div>
                </div>
                <Link href={`/login?redirect=/portal/apply/${job.id}`}>
                  <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
                    Apply Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {company.jobs.length === 0 && (
          <div className="text-center py-16 text-[#94A3B8]">
            <p className="text-lg">No open positions right now.</p>
            <p className="mt-1 text-sm">Check back later or sign up to get notified.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[#94A3B8] text-sm">
            Powered by{' '}
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
              HireMind
            </Link>
            {' '}— AI-powered hiring
          </p>
        </div>
      </div>
    </div>
  )
}
