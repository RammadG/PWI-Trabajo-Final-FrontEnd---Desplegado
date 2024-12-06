import React, { useState } from 'react'
import './NuevoContactoForm.css'
import { useGlobalContext } from '../../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm';

const NuevoContactoForm = () => {
    const { agregarContacto } = useGlobalContext()
    const navigate = useNavigate()

    const {form_state, handleChange} = useForm({
        username: ''
    })

    const formEsquema = {

    };

    const handleAddContact = async (e) => {
        e.preventDefault()

        const httpResponse = await fetch('http://localhost:8000/api/contact/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') 
            },
            body: JSON.stringify(form_state)
        })

        const response = await httpResponse.json()

        console.log(response)

        if(response.ok){
            alert(response.message)
        }else{
            alert(response.error)
        }


    };

    const handleGetBacktoHome = () => {
        navigate('/')
    };

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
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default NuevoContactoForm