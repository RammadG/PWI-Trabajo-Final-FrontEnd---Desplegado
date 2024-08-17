import React, { useState } from 'react'


const NuevoContactoForm = () => {

  const formEsquema = {
    nombre: '',
    id: Number(),
    info: '',
    mensajes: [
      {
        author: '',
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

  return (
    <div>
      <form>
        <label htmlFor="nombre">Nombre: </label>
        <input 
          type={formEsquema.nombre}
          name='nombre'
          id='nombre'
          value={formValues.nombre}
          onChange={handleChangeFormValue}/>
        <label htmlFor=""></label>
      </form>
    </div>
  )
}

export default NuevoContactoForm