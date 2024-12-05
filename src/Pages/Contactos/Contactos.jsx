import React, { useEffect, useState } from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos'
import { useNavigate } from 'react-router-dom'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { Add, Person2 } from '@mui/icons-material'
import './Contactos.css'
import { useGlobalContext } from '../../Context/GlobalContext'


const Contactos = () => {

    const { handleChangeSearchTerm, searchTerm, handleReiniciarContactos } = useGlobalContext()
    const [isLoading, setIsLoading] = useState(true)
    const [contactos, setContactos] = useState([])

    const navigate = useNavigate()
    const handleGetToContactForm = () => {
        navigate('/agregar-contacto')
    }


    const handleGetContacts = async () => {

        const httpResponse = await fetch('http://localhost:8000/api/contact/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdXRhcm9taWNlbGlAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTczMzM1NTM1NiwiZXhwIjoxNzMzNDQxNzU2fQ.5q8LggLHsSngMHMAa4pCiN275OxCHu85F1widsg4Agw'
            }
        })

        const response = await httpResponse.json()

        return response.data.contactos

    }

    useEffect(() => {
        isLoading ? handleGetContacts().then((contactos) => {
            setContactos(contactos)
            setIsLoading(false)
        }) : ''
    },
        []
    )

    console.log(contactos)

    return (
        <div className='contactos-container'>
            <div className='header-app'>
                <h1 className='title'>WhatsApp</h1>
                <SpeedDial className='menu' icon={<Add />} ariaLabel='menu'>
                    {
                        [{
                            icon: <Person2 onClick={handleGetToContactForm} />,
                            name: 'Agregar Contacto'
                        }].map((action) => <SpeedDialAction key={action.name} icon={action.icon} tootlipTitle={action.name} />)
                    }
                </SpeedDial>
            </div>
            <input onChange={handleChangeSearchTerm} value={searchTerm} type="text" className='search-contact' />
            {
                isLoading ?
                    <h1>Cargando...</h1> :
                    <ListaDeContactos data={contactos} />
            }
            {/* <button onClick={handleReiniciarContactos} className='restart-button'>Reiniciar Contactos</button> */}
        </div>
    )
}


export default Contactos