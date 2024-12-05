import React, { useEffect, useState } from 'react'
import Mensajes from '../Mensajes/Mensajes'
import './Chat.css'
import { useNavigate, useParams } from 'react-router-dom'
import InputdeMensajes from '../InputdeMensajes/InputdeMensajes'
import { useGlobalContext } from '../../Context/GlobalContext'

const Chat = () => {
  const { contactos, setContactos } = useGlobalContext()
  const navigation = useNavigate()
  const parametros = useParams()

  const [isLoading, setIsLoading] = useState(true)

  const chat = contactos.find((contacto) => contacto.id === Number(parametros.id)) || { mensajes: [], nombre: 'Sin Nombre', imagen: '', conexion: '' }

  const [listaDeMensajes, setListaDeMensajes] = useState([])

  const handleGetInInfoContact = (id) => () => {
    navigation(`/info-contacto/${id}`)
  }

  const handleGetbacktoContacts = () => {
    navigation('/')
  }

  const handleSubmit = (e, inputValue) => {
    e.preventDefault()

    const nuevoMensaje = {
      author: 'yo',
      content: ' ' + inputValue.content,
      fecha: 'ahora',
      estado: 'entregado',
    }

    const nuevaListaDeMensajes = [...listaDeMensajes, nuevoMensaje]
    setListaDeMensajes(nuevaListaDeMensajes)

    const contactosActualizados = contactos.map((contacto) =>
      contacto.id === chat.id ? { ...contacto, mensajes: nuevaListaDeMensajes } : contacto
    )

    setContactos(contactosActualizados)
    localStorage.setItem('contactos', JSON.stringify(contactosActualizados))
  }

  useEffect(() => {
/*     const chatActualizado = contactos.find((contacto) => contacto.id === Number(parametros.id))
    setListaDeMensajes(chatActualizado?.mensajes ?? []) */


    isLoading ? getContactMessages().then((listaMensajes) => {
      setListaDeMensajes(listaMensajes)
      setIsLoading(false)
    }) : ''


  }, [])






  /* AGREGADO MIO */

  const getContactMessages = async () => {

    const httpResponse = await fetch('http://localhost:8000/api/message/' + parametros.id,{
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXRhcm9taWNlbGlAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTczMzM1NTM1NiwiZXhwIjoxNzMzNDQxNzU2fQ.5q8LggLHsSngMHMAa4pCiN275OxCHu85F1widsg4Agw'
      }
    })

    const response = await httpResponse.json()

    console.log(response.data.mensajes)

    return response.data.mensajes

  }


  /* AGREGADO MIO */









  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <div className='contact-info'>
          <img onClick={handleGetbacktoContacts} src={chat.imagen} alt={`${chat.nombre} perfil`} className='profile-pic'/>
          <div className='contact-details'>
            <p className='contact-name' onClick={handleGetInInfoContact(parametros.id)}>{chat.nombre}</p>
            <p>{chat.conexion}</p>
          </div>
        </div>
      </header>
      <div className='chat-display'>
        <Mensajes mensajes={listaDeMensajes}/>
      </div>
      <footer className='input-mensaje'>
        <InputdeMensajes handleSubmit={handleSubmit}/>
      </footer>
    </div>
  )
}

export default Chat
