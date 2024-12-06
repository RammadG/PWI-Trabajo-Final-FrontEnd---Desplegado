import React, { useState } from 'react'
import './InputdeMensajes.css'


const InputdeMensajes = ({handleSubmitMessage, handleChange, form_state}) => {



  return (

  <form onSubmit={handleSubmitMessage} className='input-container'>
    <input type='text' name='content' id='content' onChange={handleChange} value={form_state.content} placeholder='Escribe un mensaje...'
    />
      <button type='submit' className='send-button'>Enviar</button>
    </form>
  )
}

export default InputdeMensajes