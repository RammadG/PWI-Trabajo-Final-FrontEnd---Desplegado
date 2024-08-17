import React, { useState } from 'react'
import Mensajes from '../Mensajes/Mensajes'
import './Chat.css'
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useParams } from 'react-router-dom';
import InputdeMensajes from '../InputdeMensajes/InputdeMensajes';


const Chat = () => {

  const parametros = useParams()
  const chat = DATA_MOOK.find((chat) => chat.id === Number(parametros.id))

  const [listaDeMensajes, setListaDeMensajes] = useState(DATA_MOOK)

  const handleSubmit = (e, inputValue) => {
    e.preventDefault()
    setListaDeMensajes([...listaDeMensajes, {    
      author: 'yo',
      content: inputValue.content,
      fecha: 'ahora',
      estado: 'entregado',
      id: 5}])
  }

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <div className='contact-info'>
          <img src="https://www.gstatic.com/images/icons/material/system/2x/person_outline_black_48dp.png" alt='profile' className='profile-pic'/>
          <div className='contact-details'>
            <p>{chat.nombre}</p>
            <p>{chat.conexion}</p>
          </div>
        </div>
      </header>
      <div className='chat-display'>
        <Mensajes mensajes={chat.mensajes ?? []} author={chat.nombre}/>
      </div>
      <footer>
      <InputdeMensajes handleSubmit={handleSubmit}/>
      </footer>
    </div>
  );
};

export default Chat