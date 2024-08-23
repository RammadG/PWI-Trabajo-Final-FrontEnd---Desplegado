import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DATA_MOOK } from '../../Data/DATA_MOOK'
import './InfoDeContacto.css'
import { useGlobalContext } from '../../Context/GlobalContext'

const InfoDeContacto = () => {
  const { contactos } = useGlobalContext()
  const navigate = useNavigate()
  const parametros = useParams()

  const contactosinfo = contactos.find((info) => info.id === Number(parametros.id))

  if (!contactosinfo) {
    return <div>Cargando información del contacto...</div>
  }

  const getBackToChat = () => {
    navigate(`/chats/${parametros.id}`)
  }

  return (
    <>
      <div className='profile-container'>
        <img src={contactosinfo.imagen || 'ruta/a/una/imagen/default.png'} alt={`${contactosinfo.nombre} perfil`} />
        <h2 className='contact-name' onClick={getBackToChat}>{contactosinfo.nombre}</h2>
        <h3>{contactosinfo.info.numero}</h3>
      </div>
      <div className='icons-container'>
        <p>Llamar</p>
        <p>Video</p>
        <p>Buscar</p>
      </div>
      <div className='state-container'>
        <p>{contactosinfo.info.descripcion}</p>
        <p>{contactosinfo.info.fechadescripcion}</p>
      </div>
    </>
  )
}

export default InfoDeContacto