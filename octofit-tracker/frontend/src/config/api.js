const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const explicitApiBaseUrl = import.meta.env.VITE_API_BASE_URL

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : (explicitApiBaseUrl ?? 'http://localhost:8000/api')

export function buildApiUrl(component) {
  if (/^https?:\/\//.test(component)) {
    return component
  }

  const normalizedComponent = component.replace(/^\/+|\/+$/g, '')

  return `${API_BASE_URL}/${normalizedComponent}/`
}

export function getCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [
    payload.results,
    payload.items,
    payload.data,
    payload.docs,
    payload.records,
    payload.collection,
  ]

  const nestedData = payload.data && typeof payload.data === 'object'
    ? [payload.data.results, payload.data.items, payload.data.docs, payload.data.records]
    : []

  return [...candidates, ...nestedData].find(Array.isArray) ?? []
}

export async function fetchCollection(component) {
  const response = await fetch(buildApiUrl(component))

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return getCollection(await response.json())
}