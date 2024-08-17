import React, { useState } from 'react'
import './InputdeMensajes.css'


const InputdeMensajes = ({handleSubmit}) => {

  const estadoInicial = {
    author: 'yo',
    content: '',
    fecha: 'ahora',
    estado: 'entregado',
  }
  const [inputValue, setInputValue] = useState(estadoInicial)

  const handleChangeInputValue = (e) => {
    const valueToChange = e.target.name
    const newValue = e.target.value
    setInputValue({...inputValue, [valueToChange]: newValue})
  }

  return (
    <form className='input-container'  onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(e, { ...inputValue });
      setInputValue({ ...inputValue, content: ''});
    }}
  >
    <input
      type='text'
      name='content'
      id='Mensaje'
      onChange={handleChangeInputValue}
      value={inputValue.content}
      placeholder='Escribe un mensaje...'
    />
      <button type='submit' className='send-button'>Enviar</button>
    </form>
  )
}

export default InputdeMensajes