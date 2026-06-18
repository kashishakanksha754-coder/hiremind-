// Prototype mock auth — no backend required.
// User session is stored in localStorage as { email, name, role }.

export type MockUser = {
  email: string;
  name: string;
  role: "recruiter" | "candidate";
};

export function getUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("hiremind_user");
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: MockUser) {
  localStorage.setItem("hiremind_user", JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem("hiremind_user");
}
