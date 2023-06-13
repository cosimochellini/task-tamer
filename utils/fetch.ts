type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

const headers = {
  'Content-Type': 'application/json',
}
export const fetcher =
  <TResult, TQuery extends Record<string, string> = never, TBody = never>(
    url: string,
    method?: Methods,
  ) =>
  async (options?: { query?: TQuery; body?: TBody }) =>
    fetch(`${url}?${new URLSearchParams(options?.query).toString()}`, {
      method,
      headers,
      body: JSON.stringify(options?.body),
    }).then((res) => res.json() as Promise<TResult>)
