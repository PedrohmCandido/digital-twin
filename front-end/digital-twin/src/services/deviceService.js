const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(errText || `HTTP error ${res.status}`)
  }

  if (res.status === 204) return null
  return res.json()
}

export const getAllDevices = () => request('/devices')
export const createDevice = (data) => request('/devices', { method: 'POST', body: JSON.stringify(data) })
export const updateDevice = (id, data) => request(`/devices/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteDevice = (id) => request(`/devices/${id}`, { method: 'DELETE' })

// Note: backend doesn't expose GET /devices/:id in current repo, so frontend will use getAllDevices and find by id when needed.

export default { getAllDevices, createDevice, updateDevice, deleteDevice }
