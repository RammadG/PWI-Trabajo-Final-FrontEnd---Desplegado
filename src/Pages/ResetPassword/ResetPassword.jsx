import React from 'react'
import useForm from '../../Hooks/useForm'
import URL_BACK from '../../Componentes/helpers/urlBack.js'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { accessToken } = useParams()
    const navigate = useNavigate()
    const { form_state, handleChange } = useForm({
        password: '',
        passwordRepetido: ''
    })

    const handleResetPassword = async (e) => {
        e.preventDefault()

        if (form_state.password !== form_state.passwordRepetido) {
            alert('Las contraseñas ingresadas no coinciden')
            return
        }

        if (form_state.password.length < 7) {
            return alert('La contraseña debe tener 8 caracteres mínimo')
        }

        const httpResponse = await fetch(URL_BACK + '/api/auth/reset-password/' + accessToken, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                password: form_state.password
            })
        })

        const serverResponse = await httpResponse.json()

        if (serverResponse.ok) {
            alert('Contraseña reestablecida con éxito!')
            return navigate('/login')
        } else {
            return alert(response.error)
        }


    }

    return (
        <div className='contenedorForm'>
            <form onSubmit={handleResetPassword} className='form'>
                <h1>Reestablecer contraseña</h1>
                <div className='label_input'>
                    <label htmlFor='password'>Ingrese su nueva contraseña</label>
                    <input name='password' id='password' placeholder='contraseñaSecreta' onChange={handleChange} />
                </div>
                <div className='label_input'>
                    <label htmlFor='passwordRepetido'>Repita su nueva contraseña</label>
                    <input name='passwordRepetido' id='passwordRepetido' placeholder='contraseñaSecreta' onChange={handleChange} />
                </div>
                <button type='submit' style={{ height: '30px' }}>Reestablecer</button>
                <span>¿Recordaste tu contraseña?, <Link to='/login'>Iniciar sesión</Link></span>
                <span>¿No tienes cuenta aún? <Link to='/register'>Registrarme</Link></span>
            </form>
        </div>
    )
}

export default ResetPassword