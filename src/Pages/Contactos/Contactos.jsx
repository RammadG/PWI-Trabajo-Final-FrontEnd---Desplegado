import React from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos';
import { DATA_MOOK } from '../../Data/DATA_MOOK';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Add, Person2 } from '@mui/icons-material';


const Contactos = () => {

  const navigate = useNavigate()
  const handleGetToContactForm = () => {
    navigate('/agregar-contacto')
  }

  return (
    <>
      <ListaDeContactos data={DATA_MOOK} />
      <SpeedDial icon={<Add/>} ariaLabel='menu'>
        {
          [{
            icon: <Person2 onClick={handleGetToContactForm} />,
            name: 'Agregar Contacto'
          }].map((action) => <SpeedDialAction key={action.name} icon={action.icon} tootlipTitle={action.name}/>)
        }
      </SpeedDial>

    </>
  );
};


export default Contactos