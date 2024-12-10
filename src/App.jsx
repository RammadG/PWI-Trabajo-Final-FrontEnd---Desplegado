import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AgregarContacto, Contactos, InfoDeContacto, Chats, Login, Registrar, ForgotPassword, ResetPassword } from './Pages'
import RutaProtegida from './Componentes/RutaProtegida';


function App() {
  return (
    <Routes>
      <Route path='/register' element={<Registrar />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password/:accessToken' element={<ResetPassword />} />
      <Route element={<RutaProtegida />}>
        <Route path='/' element={<Contactos />} />
        <Route path='/chats/:id' element={<Chats />} />
        <Route path='/agregar-contacto' element={<AgregarContacto />} />
        <Route path='/info-contacto/:id' element={<InfoDeContacto admin={false}/>} />
        <Route path='/mi-perfil' element={<InfoDeContacto admin={true}/>} />
      </Route>
    </Routes>
  );
}

export default App;