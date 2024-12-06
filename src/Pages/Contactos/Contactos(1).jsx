import React, { useEffect, useState } from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos'
import { useNavigate } from 'react-router-dom'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { Add, Person2 } from '@mui/icons-material'
import './Contactos.css'
import { useGlobalContext } from '../../Context/GlobalContext'
import useSearchTerm from '../../Hooks/useSearchTerm'
import { useAuthContext } from '../../Context/AutentificacionContex'


const Contactos = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [contactos, setContactos] = useState([])
    const [contactosFilter, setContactosFilter] = useState([])
    const [showOptions, setShowOptions] = useState('none')
    const { searchTerm, handleChangeSearchTerm } = useSearchTerm()
    const { logout } = useAuthContext()
    const navigate = useNavigate()

    const handleGetContacts = async () => {

        const httpResponse = await fetch('http://localhost:8000/api/contact/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
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
        window.innerWidth >= 700 ?
        setShowOptions('') :
        ''
    },
        []
    )

    useEffect(() => {
        const listaDeContactos = contactos

        if (searchTerm !== '') {
            const nuevaListaDeContactos = listaDeContactos.filter((contacto) =>
                contacto.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setContactosFilter(nuevaListaDeContactos)
        } else {
            setContactosFilter(listaDeContactos)
        }

        
    }, [searchTerm])
        
    const handleShowOptions = () => {
        if(showOptions){
            setShowOptions('')
        }else{
            setShowOptions('none')
        }
    }

    return (
        <div className='contactos-container'>
            <div className='header-app'>
                <h1 className='title'>WhatsApp</h1>
                <div className='options'>
                    <span className='tuerca' onClick={ handleShowOptions }>⚙️</span>
                    <ul className='list' style={{ display: showOptions }}>
                        <li className='perfil-button' onClick={() => navigate('/mi-perfil')}>Mi perfil</li>
                        <li className='perfil-button' style={{backgroundColor: 'green'}} onClick={() => navigate('/agregar-contacto')}>Agregar contacto</li>
                        <li className='logout-button' onClick={logout}>Cerrar sesión</li>
                    </ul>
                </div>
            </div>
            <input onChange={handleChangeSearchTerm} value={searchTerm} type="text" className='search-contact' />
            {
                isLoading ?
                    <h1>Cargando...</h1> :
                    <ListaDeContactos data={searchTerm ? contactosFilter : contactos} />
            }
        </div>
    )
}


export default Contactos