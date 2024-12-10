import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './InfoDeContacto.css'
import URL_BACK from '../../Componentes/helpers/urlBack.js'

const InfoDeContacto = ({ admin }) => {
  const navigate = useNavigate()
  const parametros = useParams()

  const [userData, setUserData] = useState({
    name: '',
    number: '',
    descripition: '',
    email: ''
  })

  const getUserInfo = async () => {

    const httpResponse = await fetch(URL_BACK + '/api/contact/' + parametros.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    })

    const response = await httpResponse.json()

    if (!response.ok) {
      return alert(response.message)
    }
    return response.data.user

  }

  useEffect(() => {

    admin ? setUserData(JSON.parse(sessionStorage.getItem('userData'))) :
      getUserInfo().then((user) => {
        setUserData(user)
        console.log(user)
      })

  }, [])

  return (
    <>
      <div className='profile-container'>
        <span className='return-button' onClick={admin ? () => navigate('/') : () => navigate('/chats/' + parametros.id)}>←</span>
        <img src='/perfil_default.webp' alt={`${userData.name} perfil`} />
        <h2 className='contact-name'>{userData.name}</h2>
        <h3>+54 {userData.number}</h3>
      </div>
      {
        admin ?
          <></> :
          <div className='icons-container'>
            <p>Llamar</p>
            <p>Video</p>
            <p>Buscar</p>
          </div>
      }
      <div className='state-container'>
        <p>{userData.description}</p>
        <p>{userData.email}</p>
      </div>
    </>
  )
}

export default InfoDeContacto