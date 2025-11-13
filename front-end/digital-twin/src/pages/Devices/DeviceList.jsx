import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import deviceService from '../../services/deviceService'
import AppSidebar from "../../pages/LandingPage/_components/Sidebar.jsx"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.js'

export default function DeviceList() {
  function safeGetUser() {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = async () => {
    try {
      setLoading(true)
      const data = await deviceService.getAllDevices()

      // tentativa de encontrar o patient correspondente ao usuário logado
      const sessionUser = safeGetUser()
      let patientId = null
      if (sessionUser) {
        const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
        const userId = sessionUser._id || sessionUser.id || sessionUser.userId || null
        try {
          if (userId) {
            const res = await fetch(`${BASE}/patients/${userId}`)
            if (res.ok) {
              const p = await res.json()
              patientId = p._id || p.id || null
            }
          }
        } catch (err) {
          console.warn('patient id lookup failed, will fallback to list match', err)
        }

        if (!patientId) {
          try {
            const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
            const res = await fetch(`${BASE}/patients`)
            if (res.ok) {
              const list = await res.json()
              const found = list.find(p => (sessionUser.email && p.email === sessionUser.email) || (sessionUser.name && (p.name === sessionUser.name || p.name === sessionUser.fullname)))
              if (found) patientId = found._id || found.id || null
            }
          } catch (err) {
            console.warn('patient list lookup failed', err)
          }
        }
      }

      if (patientId) {
        const filtered = data.filter((d) => {
          if (!d.fk_usuario) return false
          const fk = typeof d.fk_usuario === 'object' ? (d.fk_usuario._id || d.fk_usuario.toString()) : d.fk_usuario
          return String(fk) === String(patientId)
        })
        setDevices(filtered)
      } else {
        // sem patient correspondente — não mostrar dispositivos
        setDevices([])
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao carregar dispositivos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Remover este dispositivo?')) return
    try {
      await deviceService.deleteDevice(id)
      setDevices((prev) => prev.filter((d) => d._id !== id))
    } catch (err) {
      console.error(err)
      alert('Erro ao remover dispositivo')
    }
  }

  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 transition-all duration-300">
          <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-2">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-2xl font-bold text-gray-800">Dispositivos</h2>
              </div>

              <div className="flex items-center gap-2">

                <button
                  onClick={() => navigate('/devices/new')}
                  className="rounded-lg bg-gradient-to-r from-[#34D1B7] to-[#357066] px-3 py-1.5 text-sm text-white"
                >
                  Novo Dispositivo
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 p-4">
            <div className="mx-auto max-w-6xl">
              <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
                {loading ? (
                  <p className="text-sm text-gray-500">Carregando...</p>
                ) : devices.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhum dispositivo cadastrado.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="text-left text-sm text-gray-600 border-b">
                          <th className="py-3">Nome</th>
                          <th className="py-3">Tipo</th>
                          <th className="py-3">Status</th>
                          <th className="py-3">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {devices.map((d) => (
                          <tr key={d._id} className="hover:bg-gray-50">
                            <td className="py-3">{d.nome_dispositivo}</td>
                            <td className="py-3">{d.tipo_dispositivo}</td>
                            <td className="py-3">{d.status}</td>
                            <td className="py-3">
                              <Link
                                to={`/devices/${d._id}`}
                                className="text-[#75A7BD] font-medium hover:underline mr-3"
                              >
                                Ver
                              </Link>
                              <Link
                                to={`/devices/${d._id}/edit`}
                                className="text-[#34D1B7] font-medium hover:underline mr-3"
                              >
                                Editar
                              </Link>
                              <button
                                onClick={() => handleDelete(d._id)}
                                className="text-red-600 hover:underline font-medium"
                              >
                                Remover
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
