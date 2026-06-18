// Prototype stub — all data is mocked locally, no network calls.
// Replace with real fetch calls when the backend is ready.

export const api = {
  get: async <T = any>(_path: string): Promise<T> => { throw new Error("API not connected in prototype"); },
  post: async <T = any>(_path: string, _body?: unknown): Promise<T> => { throw new Error("API not connected in prototype"); },
  put: async <T = any>(_path: string, _body?: unknown): Promise<T> => { throw new Error("API not connected in prototype"); },
  patch: async <T = any>(_path: string, _body?: unknown): Promise<T> => { throw new Error("API not connected in prototype"); },
  del: async <T = any>(_path: string): Promise<T> => { throw new Error("API not connected in prototype"); },
};
