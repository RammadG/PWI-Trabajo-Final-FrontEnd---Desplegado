import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import URL_BACK from '../../Componentes/helpers/urlBack.js'

const Registrar = () => {

    const navigate = useNavigate()

    const { form_state, handleChange } = useForm({
        email: '',
        password: '',
        number: '',
        name: ''
    })

    const handleRegister = async (e) => {

        console.clear()
        e.preventDefault()
        const httpResponse = await fetch( URL_BACK + '/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_state)
        })

        const response = await httpResponse.json()

        if (response.ok) {
            return navigate('/login')
            
        }else{
            return alert(response.data.errors)
        }
    }

    return (
        <div className='contenedorForm'>
            <form onSubmit={handleRegister} className='form'>
                <h1>Registrate</h1>
                <div className='label_input'>
                    <label htmlFor='email'>Ingrese un mail</label>
                    <input name='email' id='email' placeholder='su_email_aquí@prueba.com' onChange={handleChange} />
                </div>
                <div className='label_input'>
                    <label htmlFor='name'>Ingrese su nombre</label>
                    <input name='name' id='name' placeholder='EJEMPLO: 2213563921' onChange={handleChange} />
                </div>
                <div className='label_input'>
                    <label htmlFor='number'>Ingrese su numero de teléfono</label>
                    <input name='number' id='number' placeholder='EJEMPLO: 2213563921' onChange={handleChange} />
                </div>
                <div className='label_input'>
                    <label htmlFor='password'>Ingrese una contraseña:</label>
                    <input name='password' id='password' placeholder='clave_secreta' onChange={handleChange} />
                </div>
                <button type='submit' style={{ height: '30px' }}>Registrarme</button>
                <span>¿Ya tienes cuenta?, <Link to='/login'>Iniciar sesión</Link></span>
            </form>
        </div>
    )
}

export default Registrar