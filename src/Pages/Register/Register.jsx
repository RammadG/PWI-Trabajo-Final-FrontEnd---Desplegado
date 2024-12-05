import React from 'react'
import { Link } from 'react-router-dom'

const Registrar = () => {


    const handleLogin = () => {

    }

    return (
        <div className='contenedorForm'>
            <form onSubmit={handleLogin} className='form'>
                <h1>Registrate</h1>
                <div className='label_input'>
                    <label htmlFor='email'>Ingrese un mail</label>
                    <input name='email' id='email' placeholder='su_email_aquí@prueba.com' />
                </div>
                <div className='label_input'>
                    <label htmlFor='number'>Ingrese su numero de teléfono</label>
                    <input name='number' id='number' placeholder='EJEMPLO: 2213563921' />
                </div>
                <div className='label_input'>
                    <label htmlFor='password'>Ingrese una contraseña:</label>
                    <input name='password' id='password' placeholder='clave_secreta' />
                </div>
                <button type='submit' style={{ height: '30px'}}>Registrarme</button>
                <span>¿Ya tienes cuenta?, <Link to='/login'>Iniciar sesión</Link></span>
            </form>
        </div>
    )
}

export default Registrar