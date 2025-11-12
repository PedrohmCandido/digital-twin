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
  if (!device) return <p>Dispositivo não encontrado. <Link to="/devices">Voltar</Link></p>

  return (
    <div>
      <h2>Detalhes do Dispositivo</h2>
      <p><strong>Nome:</strong> {device.nome_dispositivo}</p>
      <p><strong>Tipo:</strong> {device.tipo_dispositivo}</p>
      <p><strong>Status:</strong> {device.status}</p>
      <p><strong>fk_usuario:</strong> {device.fk_usuario}</p>
      <div>
        <Link to={`/devices/${device._id}/edit`}>Editar</Link>{' '}
        <Link to="/devices">Voltar</Link>
      </div>
    </div>
  )
}
