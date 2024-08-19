import React from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos';
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Add, Person2 } from '@mui/icons-material';
import './Contactos.css'


const Contactos = () => {

  const navigate = useNavigate()
  const handleGetToContactForm = () => {
    navigate('/agregar-contacto')
  }

  return (
    <div className='contactos-container'>
      <div className='header-app'>
      <h1 className='title'>WhatsApp</h1>
      <SpeedDial className='menu' icon={<Add/>} ariaLabel='menu'>
        {
          [{
            icon: <Person2 onClick={handleGetToContactForm} />,
            name: 'Agregar Contacto'
          }].map((action) => <SpeedDialAction key={action.name} icon={action.icon} tootlipTitle={action.name}/>)
        }
      </SpeedDial>
      </div>
      <input type="text" className='search-contact'/>     
      <ListaDeContactos data={DATA_MOOK} />
    </div>
  );
};


export default Contactos