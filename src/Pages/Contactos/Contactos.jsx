import React from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Add, Person2 } from '@mui/icons-material';
import './Contactos.css'
import { useGlobalContext } from '../../Context/GlobalContext';


const Contactos = () => {

  const {contactos, handleChangeSearchTerm, searchTerm} = useGlobalContext()

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
      <input onChange={handleChangeSearchTerm} value={searchTerm} type="text" className='search-contact'/>     
      <ListaDeContactos data={contactos} />
    </div>
  );
};


export default Contactos