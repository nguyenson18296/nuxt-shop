export default function useFetchBaseUrl<T>(url: string) {
  return useFetch<{ data: T }>(url, {
    baseURL: 'http://localhost:1996'
  })
}
