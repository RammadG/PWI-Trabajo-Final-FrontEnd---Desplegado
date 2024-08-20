import React, { useState } from 'react'
import './NuevoContactoForm.css'
import { useGlobalContext } from '../../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const NuevoContactoForm = () => {

  const {handleCreateContact} = useGlobalContext()
  const navigate = useNavigate()

  const formEsquema = {
    nombre: '',
    id: Number(),
    info:{
      numero: '',
      descripcion: 'HEY There!, I am using WhatsApp...',
      fechadescripcion:'hoy',
      },
    mensajes: [
      {
        author: 'yo',
        content: '',
        fecha: 'ahora',
        estado: 'entregado'
      }
    ]
  }

  const [formValues, setFormValues] = useState(formEsquema)

  const handleChangeFormValue = (e) => {
    const valueToChange = e.target.id
    const newValue = e.target.value
    setFormValues ({...formValues, [valueToChange]: newValue})
  }

  const handleGetBacktoHome = () => {
    navigate('/')
  }

  return (
    <div className="nuevo-contacto-container">
      <form onSubmit={handleCreateContact} className="nuevo-contacto-form">
        <label htmlFor="nombre" className="form-label">Nombre: </label>
        <input 
          type={formEsquema.nombre}
          name='nombre'
          id='nombre'
          value={formValues.nombre}
          onChange={handleChangeFormValue}/>
        <label htmlFor="numero" className="form-label">Número: </label>
        <input type={formEsquema.info.numero}
        name='numero'
        id='numero'
        value={formValues.info.numero}
        onChange={handleChangeFormValue}/>
      </form>
      <div className="button-container">
        <button className="form-button agregar-button">Agregar</button>
        <button onClick={handleGetBacktoHome} className="form-button cancelar-button">Cancelar</button>
      </div>
    </div>
  )
}

export default NuevoContactoForm