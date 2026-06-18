// Typed fetch helpers for the HireMind FastAPI backend.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string;
}

async function request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const json = await res.json();
      detail = json.detail ?? json.error ?? detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T = any>(path: string, token?: string) => request<T>(path, { method: "GET", token }),
  post: <T = any>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: "POST", body, token }),
  put: <T = any>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: "PUT", body, token }),
  patch: <T = any>(path: string, body?: unknown, token?: string) =>
    request<T>(path, { method: "PATCH", body, token }),
  del: <T = any>(path: string, token?: string) => request<T>(path, { method: "DELETE", token }),
};

export { BASE_URL };
