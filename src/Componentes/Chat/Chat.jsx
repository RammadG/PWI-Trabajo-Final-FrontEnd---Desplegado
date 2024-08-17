import React, { useState } from 'react'
import Mensajes from '../Mensajes/Mensajes'
import './Chat.css'
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useNavigate, useParams } from 'react-router-dom';
import InputdeMensajes from '../InputdeMensajes/InputdeMensajes';


const Chat = () => {

  const navigation = useNavigate()
  const handleGetInInfoContact = (id) => () =>{
    navigation(`/info-contacto/${id}`)
  }
  const handleGetbacktoContacts = () =>{
    navigation('/')
  }

  const parametros = useParams()
  const chat = DATA_MOOK.find((chat) => chat.id === Number(parametros.id))

  const [listaDeMensajes, setListaDeMensajes] = useState(chat.mensajes ?? []);

  const handleSubmit = (e, inputValue) => {
    e.preventDefault();
    const nuevoMensaje = {
      author: 'yo',
      content: inputValue.content,
      fecha: 'ahora',
      estado: 'entregado',
    };
    setListaDeMensajes([...listaDeMensajes, nuevoMensaje]);

    
    chat.mensajes.push(nuevoMensaje)
  }

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <div className='contact-info'>
          <img onClick={handleGetbacktoContacts} src="https://www.gstatic.com/images/icons/material/system/2x/person_outline_black_48dp.png" alt='profile' className='profile-pic'/>
          <div onClick={handleGetInInfoContact(parametros.id)} className='contact-details'>
            <p>{chat.nombre}</p>
            <p>{chat.conexion}</p>
          </div>
        </div>
      </header>
      <div className='chat-display'>
        <Mensajes mensajes={chat.mensajes ?? []} author={chat.nombre}/>
      </div>
      <footer className='input-mensaje'>
      <InputdeMensajes handleSubmit={handleSubmit}/>
      </footer>
    </div>
  );
};

export default Chat