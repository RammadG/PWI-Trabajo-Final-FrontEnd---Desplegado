import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { AgregarContacto, Contactos, InfoDeContacto, Mensajes, Chats } from './Pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Contactos/>} />
      <Route path='/chats/:id' element={<Chats />} />
      <Route path='/agregar-contacto' element={<AgregarContacto />} />
      <Route path='/info-contacto/:id' element={<InfoDeContacto />} />
    </Routes>
  );
}

export default App;