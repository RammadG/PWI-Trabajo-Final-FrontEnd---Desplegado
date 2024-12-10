import React from 'react'
import useForm from '../../Hooks/useForm'
import URL_BACK from '../../Componentes/helpers/urlBack.js'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {

    const { form_state, handleChange } = useForm({
        email: ''
    })

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        const httpResponse = await fetch(URL_BACK + '/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(form_state)
        })

        const serverResponse = await httpResponse.json()

        if (serverResponse.ok) {
            return alert('Email de reestablecimiento de contraseña enviado con éxito')
        } else {
            return alert(serverResponse.error)
        }
    }

    return (
        <div className='contenedorForm'>
            <form onSubmit={handleForgotPassword} className='form'>
                <h1>Olvidé mi contraseña</h1>
                <div className='label_input'>
                    <label htmlFor='email'>Ingrese su email o numero de teléfono:</label>
                    <input name='email' id='email' placeholder='su_email_aquí@prueba.com' onChange={handleChange} />
                </div>
                <button type='submit' style={{ height: '30px' }}>Enviar email de recuperación</button>
                <span>¿Recordaste tu contraseña?, <Link to='/login'>Iniciar sesión</Link></span>
                <span>¿No tienes cuenta aún? <Link to='/register'>Registrarme</Link></span>
            </form>
        </div>
    )
}

export default ForgotPassword