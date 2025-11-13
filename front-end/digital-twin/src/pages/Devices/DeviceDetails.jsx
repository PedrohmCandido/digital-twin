import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import deviceService from '../../services/deviceService'

export default function DeviceDetails() {
  const { id } = useParams()
  const [device, setDevice] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const all = await deviceService.getAllDevices()
        const found = all.find((d) => d._id === id)
        setDevice(found || null)
      } catch (err) {
        console.error(err)
        alert('Erro ao carregar dispositivo')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) return <p>Carregando...</p>
  if (!device)
    return (
      <div className="min-h-screen flex items-start justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
            <p className="text-sm text-gray-500">Dispositivo não encontrado.</p>
            <div className="mt-4">
              <Link to="/devices" className="text-[#75A7BD] font-medium hover:underline">
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-[#324158] mb-4">Detalhes do Dispositivo</h2>

          <div className="space-y-3 text-sm text-[#324158]">
            <div>
              <div className="text-xs text-gray-500">Nome</div>
              <div className="font-medium">{device.nome_dispositivo}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Tipo</div>
              <div className="font-medium">{device.tipo_dispositivo}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Status</div>
              <div className="font-medium">{device.status}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Paciente (fk_usuario)</div>
              <div className="font-medium">{device.fk_usuario}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              to={`/devices/${device._id}/edit`}
              className="py-2 px-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#34D1B7] to-[#357066] hover:from-[#357066] hover:to-[#34D1B7]"
            >
              Editar
            </Link>
            <Link to="/devices" className="py-2 px-4 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50">
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
