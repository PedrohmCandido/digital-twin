import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import deviceService from '../../services/deviceService'

export default function DeviceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [device, setDevice] = useState({ nome_dispositivo: '', tipo_dispositivo: '', status: 'ativo', fk_usuario: '' })
  const [patients, setPatients] = useState([])

  useEffect(() => {
    // carregar lista de pacientes para popular select do fk_usuario
    (async () => {
      try {
        const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'
        const res = await fetch(`${BASE}/patients`)
        if (res.ok) {
          const list = await res.json()
          setPatients(list)
          // se estamos criando e não há fk definido, predefina com o primeiro paciente (se existir)
          setDevice((d) => ({ ...d, fk_usuario: d.fk_usuario || (list[0]?._id || '') }))
        }
      } catch (err) {
        console.error('Erro ao carregar pacientes', err)
      }
    })()

    if (id) {
      // backend não tem GET /devices/:id, então buscamos todos e filtramos
      (async () => {
        try {
          setLoading(true)
          const all = await deviceService.getAllDevices()
          const found = all.find((d) => d._id === id)
          if (found) setDevice(found)
        } catch (err) {
          console.error(err)
          alert('Erro ao carregar dispositivo')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [id])

  const handleChange = (e) => setDevice({ ...device, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (id) {
        await deviceService.updateDevice(id, device)
        alert('Atualizado com sucesso')
      } else {
        await deviceService.createDevice(device)
        alert('Criado com sucesso')
      }
      navigate('/devices')
    } catch (err) {
      console.error(err)
      alert('Erro ao salvar dispositivo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="border border-black/10 p-6 rounded-2xl shadow-sm bg-white">
          <h2 className="text-2xl font-semibold text-[#324158] mb-4">{id ? 'Editar Dispositivo' : 'Novo Dispositivo'}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nome</label>
              <input
                name="nome_dispositivo"
                value={device.nome_dispositivo || ''}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] placeholder-[#75A7BD] py-2 px-3 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/20"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <input
                name="tipo_dispositivo"
                value={device.tipo_dispositivo || ''}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] placeholder-[#75A7BD] py-2 px-3 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/20"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={device.status || 'ativo'}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] py-2 px-3 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/20"
              >
                <option value="ativo">ativo</option>
                <option value="inativo">inativo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Paciente</label>
              {patients.length === 0 ? (
                <div className="text-sm text-red-600">Nenhum paciente encontrado. Crie um paciente antes de adicionar um dispositivo.</div>
              ) : (
                <select
                  name="fk_usuario"
                  value={device.fk_usuario || ''}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#6CB7BD] text-[#324158] py-2 px-3 focus:outline-none focus:ring-4 focus:ring-[#34D1B7]/20"
                >
                  <option value="">-- selecione um paciente --</option>
                  {patients.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={loading || patients.length === 0}
                className="py-2 px-4 rounded-full font-semibold text-white bg-gradient-to-r from-[#34D1B7] to-[#357066] hover:from-[#357066] hover:to-[#34D1B7] disabled:opacity-70"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/devices')}
                className="py-2 px-4 rounded-full font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
