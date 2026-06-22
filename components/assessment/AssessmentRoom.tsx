'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Question {
  id: number
  type: 'mcq' | 'short'
  question: string
  options?: string[]
  timeSeconds?: number
}

const QUESTIONS: Question[] = [
  { id: 1, type: 'mcq', question: 'Which React hook is used to run a side effect after every render?', options: ['useState', 'useEffect', 'useRef', 'useMemo'] },
  { id: 2, type: 'mcq', question: 'What does the "key" prop in a list do in React?', options: ['Styles the element', 'Helps React identify which items changed', 'Encrypts the data', 'Prevents re-renders'] },
  { id: 3, type: 'short', question: 'Explain the difference between controlled and uncontrolled components in React.' },
  { id: 4, type: 'mcq', question: 'Which HTTP method is used to partially update a resource?', options: ['GET', 'POST', 'PUT', 'PATCH'] },
  { id: 5, type: 'short', question: 'Describe how you would optimise a React application that has performance issues. List at least 3 specific techniques.' },
  { id: 6, type: 'mcq', question: 'What is the output of: console.log(typeof null)?', options: ['"null"', '"undefined"', '"object"', '"boolean"'] },
  { id: 7, type: 'mcq', question: 'Which CSS property creates a stacking context?', options: ['display: flex', 'z-index with position', 'margin: auto', 'overflow: hidden'] },
  { id: 8, type: 'short', question: 'What is the Virtual DOM in React and why does it exist?' },
]

const TOTAL_SECONDS = 30 * 60 // 30 minutes

interface AssessmentRoomProps {
  assessmentId: string
}

type Phase = 'intro' | 'active' | 'submitted'

export default function AssessmentRoom({ assessmentId }: AssessmentRoomProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [showTabWarning, setShowTabWarning] = useState(false)
  const [flagged, setFlagged] = useState(false)

  useEffect(() => {
    if (phase !== 'active') return
    const interval = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          setPhase('submitted')
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (phase !== 'active') return
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches(prev => {
          const next = prev + 1
          if (next >= 3) setFlagged(true)
          setShowTabWarning(true)
          setTimeout(() => setShowTabWarning(false), 4000)
          return next
        })
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [phase])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isLowTime = secondsLeft < 300
  const answeredCount = Object.keys(answers).length

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-[#1E2D45] rounded-2xl p-8 w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl mx-auto mb-4">🧠</div>
            <h1 className="text-2xl font-bold text-[#F1F5F9]">Skill Assessment</h1>
            <p className="text-[#94A3B8] mt-2">Senior Frontend Developer — Recruit AI</p>
          </div>
          <div className="space-y-3 mb-6">
            {[
              ['📋', 'Questions', `${QUESTIONS.length} questions (MCQ + short answer)`],
              ['⏱️', 'Time Limit', '30 minutes'],
              ['🚫', 'Tab Switching', 'Monitored — 3 switches = flagged'],
              ['📊', 'Scoring', 'Instant AI grading after submission'],
            ].map(([icon, label, value]) => (
              <div key={label as string} className="flex items-center gap-3 p-3 bg-[#0D1526] rounded-lg">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-[#F1F5F9]">{label}</p>
                  <p className="text-xs text-[#94A3B8]">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setPhase('active')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3">
            Begin Assessment
          </Button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'submitted') {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#111827] border border-[#1E2D45] rounded-2xl p-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-2">Assessment Submitted!</h1>
          <p className="text-[#94A3B8]">
            You answered {answeredCount} of {QUESTIONS.length} questions. Our AI is grading your responses now.
            Results will be shared with the recruiter and you'll receive an email update shortly.
          </p>
          {flagged && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-400">
              ⚠️ Your session was flagged for multiple tab switches. The recruiter has been notified.
            </div>
          )}
        </motion.div>
      </div>
    )
  }

  const question = QUESTIONS[currentQ]

  return (
    <div className="min-h-screen bg-[#080C14] flex flex-col">
      {/* Tab switch warning */}
      <AnimatePresence>
        {showTabWarning && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black px-6 py-3 flex items-center justify-center gap-2 font-semibold"
          >
            <AlertTriangle className="h-5 w-5" />
            {flagged
              ? `Tab switch #${tabSwitches} detected. Your session has been flagged.`
              : `Warning: Tab switch detected (${tabSwitches}/3). This is being recorded.`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E2D45]">
        <div className="text-sm font-semibold text-[#F1F5F9]">Skill Assessment</div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-lg font-bold tabular-nums ${
          isLowTime ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-[#0D1526] border-[#1E2D45] text-[#F1F5F9]'
        }`}>
          <Clock className={`h-4 w-4 ${isLowTime ? 'animate-pulse' : ''}`} />
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-sm text-[#94A3B8]">{answeredCount}/{QUESTIONS.length} answered</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Question nav sidebar */}
        <div className="w-20 border-r border-[#1E2D45] p-3 flex flex-col gap-2 overflow-y-auto">
          {QUESTIONS.map((q, i) => (
            <button key={q.id} onClick={() => setCurrentQ(i)}
              className={`w-full aspect-square rounded-lg text-sm font-bold transition-all ${
                i === currentQ ? 'bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg'
                : answers[q.id] ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-[#0D1526] border border-[#1E2D45] text-[#94A3B8] hover:border-blue-500/40'
              }`}>
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question area */}
        <div className="flex-1 flex flex-col p-8 max-w-3xl mx-auto w-full">
          <div className="mb-2 flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${
              question.type === 'mcq' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-violet-500/10 border-violet-500/30 text-violet-400'
            }`}>
              {question.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
            </span>
            <span className="text-xs text-[#94A3B8]">Question {currentQ + 1} of {QUESTIONS.length}</span>
          </div>

          <motion.div key={question.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="flex-1">
            <h2 className="text-xl font-semibold text-[#F1F5F9] mb-6 leading-relaxed">{question.question}</h2>

            {question.type === 'mcq' && question.options && (
              <div className="space-y-3">
                {question.options.map(opt => (
                  <button key={opt} onClick={() => setAnswers({ ...answers, [question.id]: opt })}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                      answers[question.id] === opt
                        ? 'border-blue-500 bg-blue-500/10 text-[#F1F5F9]'
                        : 'border-[#1E2D45] bg-[#0D1526] text-[#94A3B8] hover:border-blue-500/40 hover:text-[#F1F5F9]'
                    }`}>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'short' && (
              <textarea
                value={answers[question.id] || ''}
                onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })}
                placeholder="Type your answer here..."
                className="w-full h-48 p-4 bg-[#0D1526] border border-[#1E2D45] rounded-xl text-[#F1F5F9] placeholder-[#94A3B8] focus:outline-none focus:border-blue-500/50 resize-none text-sm leading-relaxed"
              />
            )}
          </motion.div>

          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="border-[#1E2D45] text-[#94A3B8] hover:text-[#F1F5F9]">
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            {currentQ < QUESTIONS.length - 1 ? (
              <Button onClick={() => setCurrentQ(currentQ + 1)}
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={() => setPhase('submitted')}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Send className="h-4 w-4 mr-2" /> Submit Assessment
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
