export type UserType = 'recruiter' | 'candidate'

export interface MockUser {
  type: UserType
  name: string
  email: string
  company?: string
}

export const mockRecruiterUser: MockUser = {
  type: 'recruiter',
  name: 'Priya Sharma',
  email: 'priya@acmecorp.com',
  company: 'Acme Corp',
}

export const mockCandidateUser: MockUser = {
  type: 'candidate',
  name: 'Kashish Verma',
  email: 'kashish@gmail.com',
}

export function getMockUser(): MockUser | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem('hiremind_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setMockUser(user: MockUser): void {
  localStorage.setItem('hiremind_user', JSON.stringify(user))
}

export function clearMockUser(): void {
  localStorage.removeItem('hiremind_user')
}

export function isLoggedIn(): boolean {
  return getMockUser() !== null
}
