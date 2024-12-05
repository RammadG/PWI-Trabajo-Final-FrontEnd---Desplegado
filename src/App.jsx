import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AgregarContacto, Contactos, InfoDeContacto, Chats } from './Pages'
import RutaProtegida from './Componentes/RutaProtegida';
import Login from './Pages/Login/Login';
import Registrar from './Pages/Register/Register';

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Registrar />} />
      <Route path='/login' element={<Login />} />
      <Route element={<RutaProtegida />}>
        <Route path='/' element={<Contactos />} />
        <Route path='/chats/:id' element={<Chats />} />
        <Route path='/agregar-contacto' element={<AgregarContacto />} />
        <Route path='/info-contacto/:id' element={<InfoDeContacto />} />
      </Route>
    </Routes>
  );
}

export default App;