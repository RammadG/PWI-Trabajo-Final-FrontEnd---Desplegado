import React from 'react'
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useParams } from 'react-router-dom';
import './Mensajes.css'


const Mensajes = ({mensajes, author}) => {

  return mensajes.length > 0 ? mensajes.map((mensaje, index) => (
    <div key={index} className={`mensajes ${mensaje.author === 'yo' ? 'mensaje-yo' : 'mensaje-otros'}`}>
      <p className='mensaje-autor'>{mensaje.author === 'yo' ? 'Yo' : author}</p>
      <h2 className='mensaje-contenido'>{mensaje.content}</h2>
      <div className='mensaje-fecha-estado'>
        <span className='mensaje-fecha'>{mensaje.fecha}</span>
        <span className='mensaje-estado'>{mensaje.estado}</span>
      </div>
    </div>
  )): <h2>'No hay Mensajes'</h2>;

};

export default Mensajes