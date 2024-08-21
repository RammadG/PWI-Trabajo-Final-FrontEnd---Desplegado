import React, { useState } from 'react'
import './NuevoContactoForm.css'
import { useGlobalContext } from '../../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const NuevoContactoForm = () => {

  const { handleCreateContact } = useGlobalContext()
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

    if (valueToChange === 'numero') {
      setFormValues({
        ...formValues,
        info: { ...formValues.info, numero: newValue },
      })
    } else {
      setFormValues({ ...formValues, [valueToChange]: newValue })
    }
  }

  const handleGetBacktoHome = () => {
    navigate('/')
  }

  return (
    <div className="nuevo-contacto-container">
      <form onSubmit={handleCreateContact} className="nuevo-contacto-form">
        <label htmlFor="nombre" className="form-label">Nombre: </label>
        <input 
          type="text"
          name='nombre'
          id='nombre'
          value={formValues.nombre}
          onChange={handleChangeFormValue}
        />
        <label htmlFor="numero" className="form-label">Número: </label>
        <input 
          type="text"
          name='numero'
          id='numero'
          value={formValues.info.numero}
          onChange={handleChangeFormValue}
        />
        <button type="submit" className="form-button agregar-button">
          Agregar
        </button>
      </form>
      <div className="button-container">
        <button onClick={handleGetBacktoHome} className="form-button cancelar-button">
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default NuevoContactoForm