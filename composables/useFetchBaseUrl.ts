export default function useFetchBaseUrl<T>(url: string, options?: RequestInit) {
  return useFetch<{ data: T }>(url, {
    method: options?.method ?? 'GET',
    baseURL: 'http://localhost:1996',
    body: options?.body,
    ...options
  })
}
