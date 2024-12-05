import React from 'react'
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useParams } from 'react-router-dom';
import './Mensajes.css'


const Mensajes = ({ mensajes, author }) => {

    const parametros = useParams()

    console.log(mensajes)

    return (

        <>
            {
                mensajes.length > 0 ? mensajes.map((mensaje, index) => {
                    console.log('receiver_id: ',mensaje.receiver_id)
                    console.log('parametros.id: ', parametros.id)
                    return (
                        <div key={index} className={`mensajes ${mensaje.receiver_id == parametros.id ? 'mensaje-otros' : 'mensaje-yo'}`}>
                            <p className='mensaje-autor'>{mensaje.author === 'yo' ? 'Yo' : author}</p>
                            <h2 className='mensaje-contenido'>{mensaje.content}</h2>
                            <div className='mensaje-fecha-estado'>
                                <span className='mensaje-fecha'>{mensaje.fecha}</span>
                                <span className='mensaje-estado'>{mensaje.estado}</span>
                            </div>
                        </div>
                    )
                }) : <h2>'No hay Mensajes'</h2>}

        </>

    )

};

export default Mensajes