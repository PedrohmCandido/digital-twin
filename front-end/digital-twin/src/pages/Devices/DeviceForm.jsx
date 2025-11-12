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
    <div>
      <h2>{id ? 'Editar Dispositivo' : 'Novo Dispositivo'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input name="nome_dispositivo" value={device.nome_dispositivo || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Tipo</label>
          <input name="tipo_dispositivo" value={device.tipo_dispositivo || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={device.status || 'ativo'} onChange={handleChange}>
            <option value="ativo">ativo</option>
            <option value="inativo">inativo</option>
          </select>
        </div>
        <div>
          <label>Paciente (fk_usuario)</label>
          {patients.length === 0 ? (
            <div>
              <p>Nenhum paciente encontrado. Crie um paciente antes de adicionar um dispositivo.</p>
            </div>
          ) : (
            <select name="fk_usuario" value={device.fk_usuario || ''} onChange={handleChange} required>
              <option value="">-- selecione um paciente --</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>{p.name} ({p._id})</option>
              ))}
            </select>
          )}
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading || patients.length === 0}>{loading ? 'Salvando...' : 'Salvar'}</button>
          <button type="button" onClick={() => navigate('/devices')} style={{ marginLeft: 8 }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
