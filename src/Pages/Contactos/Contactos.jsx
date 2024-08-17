import React from 'react'
import ListaDeContactos from '../../Componentes/ListaDeContactos/ListaDeContactos';
import { DATA_MOOK } from '../../Data/DATA_MOOK';


const Contactos = () => {
  return (
        <ListaDeContactos data={DATA_MOOK}/>
      );
    };


export default Contactos