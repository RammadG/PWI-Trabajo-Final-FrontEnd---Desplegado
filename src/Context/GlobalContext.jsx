import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { crearContacto, obtenerContactos, reiniciarContactos } from '../Componentes/helpers/listadecontactos'
import { v4 as uuid } from 'uuid';


const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
  
  const [contactos, setContactos] = useState(obtenerContactos())
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }
  
  useEffect(()=>{
  const listaDeContactos = JSON.parse(localStorage.getItem('contactos')) || obtenerContactos();

  if (searchTerm !== '') {
    const nuevaListaDeContactos = listaDeContactos.filter((contacto) =>
      contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setContactos(nuevaListaDeContactos)
  } else {
    setContactos(listaDeContactos)
  }
}, [searchTerm])

  const handleCreateContact = (e) => {
    e.preventDefault()
    const formulario = e.target
    const formularioValores = new FormData(formulario)

    const nuevoContacto = {
      nombre: '',
      id: Number(),
      info:{
        numero: '',
        descripcion: 'HEY There!, I am using WhatsApp...',
        fechadescripcion:'hoy',
        },
      mensajes: [
        {
          author: 'yo',
          content: '',
          fecha: 'ahora',
          estado: 'entregado'
        }
      ]
    }

    for(let propiedad in nuevoContacto){
    nuevoContacto[propiedad] = formularioValores.get(propiedad)
  }
  nuevoContacto.id = uuid()
  crearContacto(nuevoContacto)
  setContactos([...contactos, nuevoContacto])
  navigate('/')
}

/* const handleReiniciarContactos = () => {
  localStorage.clear()
  navigate('/')
} */

  return (
    <GlobalContext.Provider value={
      {
        contactos: contactos,
        handleChangeSearchTerm,
        searchTerm,
        handleCreateContact,
        setContactos,   
      }
    }>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}