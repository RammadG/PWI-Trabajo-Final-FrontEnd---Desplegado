import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import { useAuthContext } from '../../Context/AutentificacionContex'
import URL_BACK from '../../Componentes/helpers/urlBack.js'

const Login = () => {

    const navigate = useNavigate()

    const { login, userData, setUserData } = useAuthContext()

    const {form_state, handleChange} = useForm({
        username: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault()

        const httpResponse = await fetch( URL_BACK + '/api/auth/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form_state)
        })
    
        const response = await httpResponse.json()



        if(response.ok){
            setUserData(response.data.user)
            sessionStorage.setItem('userData', JSON.stringify(response.data.user))
            sessionStorage.setItem('author_id', response.data.author_id)
            navigate('/')
        }else{
            alert(response.error)
        }
    }


    return (
        <div className='contenedorForm'>
            <form onSubmit={handleLogin} className='form'>
                <h1>Iniciar sesion</h1>
                <div className='label_input'>
                    <label htmlFor='username'>Ingrese su email o numero de teléfono:</label>
                    <input name='username' id='username' placeholder='su_email_aquí@prueba.com' onChange={handleChange} />
                </div>
                <div className='label_input'>
                    <label htmlFor='password'>Ingrese su contraseña:</label>
                    <input name='password' id='password' placeholder='clave_secreta' onChange={handleChange}/>
                </div>
                <button type='submit' style={{ height: '30px'}}>Iniciar sesion</button>
                <span>¿No tienes cuenta?, <Link to='/register'>Registrate</Link></span>
                <span>Has olvidado la contraseña? <Link to='/forgot-password'>Restablecer</Link></span>
            </form>
        </div>
    )
}

export default Login