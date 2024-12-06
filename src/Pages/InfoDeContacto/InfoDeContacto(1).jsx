import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DATA_MOOK } from '../../Data/DATA_MOOK'
import './InfoDeContacto.css'
import { useGlobalContext } from '../../Context/GlobalContext'

const InfoDeContacto = ({ admin }) => {

  const { contactos } = useGlobalContext()
  const navigate = useNavigate()
  const parametros = useParams()

  const [userData, setUserData] = useState({
    name: '',
    number: '',
    descripition: '',
    email: ''
  })

  const getBackToChat = () => {
    navigate(`/chats/${parametros.id}`)
  }

  const getUserInfo = async () => {

    const httpResponse = await fetch('http://localhost:8000/api/contact/' + parametros.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
      }
    })

    const response = await httpResponse.json()

    return response.data.user


  }

  useEffect(() => {

    admin ? setUserData(JSON.parse(sessionStorage.getItem('userData'))) :
      getUserInfo().then((user) => {
        setUserData(user)
      })

  }, [])

  return (
    <>
      <div className='profile-container'>
        <span className='return-button' onClick={ admin ? () => navigate('/') : () => navigate('/chats/' + parametros.id)}>←</span>
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