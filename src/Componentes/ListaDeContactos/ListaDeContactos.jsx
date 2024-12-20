import React from 'react'
import './ListaDeContactos.css'
import { useNavigate } from 'react-router-dom'
import URL_BACK from '../helpers/urlBack.js'

const ListaDeContactos = ({ data }) => {
  const navigate = useNavigate()

  const handleGetInContact = (id) => () => {
    navigate(`/chats/${id}`)
  }

  const handleDeleteContact = async (contactId) => {

    const httpResponse = await fetch(URL_BACK + '/api/contact/' + contactId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    })

    const response = await httpResponse.json()

    if (response.ok) {
      alert(response.message)
      navigate(0)
      return
    }else{
      return alert(response.error)
    }

  }

  return (
    <div className='contactos-list'>
      {
        data[0] ? data.map((contacto) => {
          return (
            <div key={contacto.id} className='contenedor-contacto'>
              <div onClick={handleGetInContact(contacto.id)} className='contacto-item'>
                <img src={'/perfil_default.webp'} alt={`${contacto.nombre} profile`} className='contacto-img' />
                <div className='contacto-info'>
                  <div className='titulo'>
                    <h3>{contacto.name}</h3>
                  </div>
                </div>

              </div>
              <span className='delete-contact' onClick={() => handleDeleteContact(contacto.id)}>❌</span>
            </div>
          )
        }) :
          <h1>Usted no posee contactos</h1>
      }
    </div>
  )
}

export default ListaDeContactos