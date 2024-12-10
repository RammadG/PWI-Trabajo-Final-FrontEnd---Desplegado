import React, { useEffect, useState } from 'react'
import Mensajes from '../Mensajes/Mensajes'
import './Chat.css'
import { useNavigate, useParams } from 'react-router-dom'
import InputdeMensajes from '../InputdeMensajes/InputdeMensajes'
import useForm from '../../Hooks/useForm.jsx'
import URL_BACK from '../helpers/urlBack.js'

const Chat = () => {
  const navigate = useNavigate()
  const parametros = useParams()


  const [isLoading, setIsLoading] = useState(true)
  const [nombreContacto, setNombreContacto] = useState('')
  const { form_state, handleChange } = useForm({
    content: ''
  })

  const [listaDeMensajes, setListaDeMensajes] = useState([])

  const handleGetInInfoContact = (id) => () => {
    navigate(`/info-contacto/${id}`)
  }

  const handleGetbacktoContacts = () => {
    navigate('/')
  }

  useEffect(() => {

    isLoading ? getContactMessages().then((listaMensajes) => {
      setListaDeMensajes(listaMensajes)
      setIsLoading(false)
    }) : ''


  }, [listaDeMensajes])

  const getContactMessages = async () => {

    const httpResponse = await fetch( URL_BACK + '/api/message/' + parametros.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    })

    const response = await httpResponse.json()

    setNombreContacto(response.data.nombreContacto)

    return response.data.mensajes

  }

  const handleSubmitMessage = async (e) => {
    e.preventDefault()

    if (!form_state.content) {
      return
    }

    const httpResponse = await fetch( URL_BACK + '/api/message/' + parametros.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify(form_state)
    })

    const response = await httpResponse.json()


    if (response.ok) {

      const nuevoMensaje = {
        //id: listaDeMensajes[listaDeMensajes.length - 1] ? listaDeMensajes[listaDeMensajes.length - 1].id + 1 : 1,
        author_id: sessionStorage.getItem('author_id'),
        content: form_state.content,
        receiver_id: parametros.id,
        created_at: `ahora`
      }

      const listaDeMensajesActualizada = listaDeMensajes ? [...listaDeMensajes, nuevoMensaje] : [nuevoMensaje]

      setListaDeMensajes(listaDeMensajesActualizada)

      form_state.content = ''
      return
    }else{
      return alert(response.error)
    }
  }

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <div className='contact-info'>
          <span className='home-button' onClick={() => navigate('/')}>←</span>
          <img onClick={handleGetbacktoContacts} src={'/perfil_default.webp'} alt={`${nombreContacto} perfil`} className='profile-pic' />
          <div className='contact-details'>
            <p className='contact-name' onClick={handleGetInInfoContact(parametros.id)}>{nombreContacto}</p>
            <p style={{ color: 'grey', fontSize: '12px' }}>En línea</p>
          </div>
        </div>
      </header>
      <div className='chat-display'>
        <Mensajes mensajes={listaDeMensajes} />
      </div>
      <footer className='input-mensaje'>
        <InputdeMensajes handleSubmitMessage={handleSubmitMessage} form_state={form_state} handleChange={handleChange} />
      </footer>
    </div>
  )
}

export default Chat
