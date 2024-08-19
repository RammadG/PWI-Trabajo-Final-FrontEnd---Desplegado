import React from 'react'
import './ListaDeContactos.css'
import { useNavigate } from 'react-router-dom';

const ListaDeContactos = ({ data }) => {
  const navigate = useNavigate();

  const handleGetInContact = (id) => () => {
    navigate(`/chats/${id}`);
  }

  return (
    <div className="contactos-list">
      {data.map((contacto) => {
        const ultimoMensaje = contacto.mensajes[contacto.mensajes.length - 1];
        return (
          <div onClick={handleGetInContact(contacto.id)} key={contacto.id} className="contacto-item">
            <img src={contacto.imagen} alt={`${contacto.nombre} profile`} className="contacto-img" />
            <div className="contacto-info">
              <div className="titulo">
                <h3>{contacto.nombre}</h3>
                <small>{ultimoMensaje.fecha}</small>
              </div>
              <p>
                <strong>{ultimoMensaje.author}:</strong>
                {ultimoMensaje.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaDeContactos;