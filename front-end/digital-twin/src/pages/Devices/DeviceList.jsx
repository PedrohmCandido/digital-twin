import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import deviceService from '../../services/deviceService'

export default function DeviceList() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = async () => {
    try {
      setLoading(true)
      const data = await deviceService.getAllDevices()
      setDevices(data)
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
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#324158]">Dispositivos</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/landing-page')}
                className="py-2 px-4 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Página Principal
              </button>

              <button
                onClick={() => navigate('/devices/new')}
                className="py-2 px-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#34D1B7] to-[#357066] hover:from-[#357066] hover:to-[#34D1B7] focus:outline-none"
              >
                Novo Dispositivo
              </button>
            </div>
          </div>

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
  )
}
