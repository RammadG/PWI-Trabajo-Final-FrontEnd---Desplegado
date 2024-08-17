import React from 'react'
import { useParams } from 'react-router-dom'
import { DATA_MOOK } from '../../Data/DATA_MOOK'
import './InfoDeContacto.css'

const InfoDeContacto = () => {
  const parametros = useParams()
  const contactosinfo = DATA_MOOK.find((info) => info.id === Number(parametros.id))

  return (
    <>
      <div className='profile-container'>
        <img src="" alt="" />
        <h2>{contactosinfo.nombre}</h2>
        <h3>{contactosinfo.info.numero}</h3>
      </div>
      <div className='icons-container'>
        <p>Llamar</p>
        <p>Video</p>
        <p>Bucar</p>
      </div>
      <div className='state-container'>
        <p>{contactosinfo.info.descripcion}</p>
        <p>{contactosinfo.info.fechadescripcion}</p>
      </div>

    </>
  )
}

export default InfoDeContacto