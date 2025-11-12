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

  useEffect(() => { load() }, [])

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
    <div>
      <h2>Dispositivos</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate('/devices/new')}>Novo Dispositivo</button>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : devices.length === 0 ? (
        <p>Nenhum dispositivo cadastrado.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d) => (
              <tr key={d._id}>
                <td>{d.nome_dispositivo}</td>
                <td>{d.tipo_dispositivo}</td>
                <td>{d.status}</td>
                <td>
                  <Link to={`/devices/${d._id}`}>Ver</Link>{' '}
                  <Link to={`/devices/${d._id}/edit`}>Editar</Link>{' '}
                  <button onClick={() => handleDelete(d._id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
