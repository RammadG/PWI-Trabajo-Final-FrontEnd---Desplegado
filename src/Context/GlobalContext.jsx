import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerContactos } from '../Componentes/helpers/listadecontactos'
import { v4 as uuid } from 'uuid'

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [contactos, setContactos] = useState(obtenerContactos())
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  };

  useEffect(() => {
    const listaDeContactos = JSON.parse(localStorage.getItem('contactos')) || obtenerContactos()

    if (searchTerm !== '') {
      const nuevaListaDeContactos = listaDeContactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setContactos(nuevaListaDeContactos)
    } else {
      setContactos(listaDeContactos)
    }
  }, [searchTerm])

  const handleCreateContact = (formValues) => {
    const nuevoContacto = {
      ...formValues,
      id: uuid(),
    }

    const nuevosContactos = [...contactos, nuevoContacto]
    setContactos(nuevosContactos)
    localStorage.setItem('contactos', JSON.stringify(nuevosContactos))
  }

  useEffect(() => {
    const contactosActualizados = JSON.parse(localStorage.getItem('contactos')) || []
    setContactos(contactosActualizados);
  }, [])

  const agregarContacto = (nuevoContacto) => {
    const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || []
    contactosGuardados.push(nuevoContacto)
    localStorage.setItem('contactos', JSON.stringify(contactosGuardados))
    setContactos(contactosGuardados)
  }

  return (
    <GlobalContext.Provider
      value={{
        contactos,
        handleChangeSearchTerm,
        searchTerm,
        handleCreateContact,
        setContactos,
        agregarContacto
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}