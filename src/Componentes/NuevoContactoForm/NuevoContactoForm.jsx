import React, { useEffect, useState } from 'react'
import './NuevoContactoForm.css'
import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm';
import URL_BACK from '../helpers/urlBack.js';

const NuevoContactoForm = () => {
    const navigate = useNavigate()
    const [usuarios, setUsuarios] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { form_state, handleChange } = useForm({
        username: ''
    })


    useEffect(() => {
        getAllUsers().then((users) => {
            setUsuarios(users.data.usuarios)
            setIsLoading(false)
        })
    }, [])

    const getAllUsers = async () => {
        const httpResponse = await fetch( URL_BACK + '/api/contact/get/users',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
                }
            }
        )

        const responseServer = await httpResponse.json()

        return responseServer
    }


    const handleAddContact = async (e) => {
        e.preventDefault()

        const httpResponse = await fetch( URL_BACK + '/api/contact/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const response = await httpResponse.json()

        if (response.ok) {
            alert(response.message)
        } else {
            alert(response.error)
        }


    }

    const handleGetBacktoHome = () => {
        navigate('/')
    }

    return (
        <div className="nuevo-contacto-container">
            <form onSubmit={handleAddContact} className="nuevo-contacto-form">
                <label htmlFor="username" className="form-label">Numero de teléfono o email: </label>
                <input name='username' id='username' value={form_state.username} onChange={handleChange} required />

                <button type="submit" className="form-button agregar-button">
                    Agregar
                </button>
            </form>
            <div className="button-container">
                <button onClick={handleGetBacktoHome} className="form-button cancelar-button">
                    Volver
                </button>
            </div>
            <div>
                <h3>Usted puede agregar estos usuarios:</h3>
                {
                    isLoading ?
                        <span>Cargando...</span> :
                        <ul className='users'>
                            {
                                usuarios.map((usuario, index) => {
                                    return (
                                        <li>
                                            <span>Nombre: {usuario.name}</span>
                                            <span>Número: {usuario.number}</span>
                                            <span>email: {usuario.email}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                }
            </div>
        </div>
    );
};

export default NuevoContactoForm