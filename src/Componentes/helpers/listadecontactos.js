import { DATA_MOOK } from "../../Data/DATA_MOOK";

const obtenerContactosporid = (id) => {
  return DATA_MOOK.find(contacto => contacto.id === id)
  }

const guardarContacto = (DATA_MOOK) => {
  const contactos_JSON = JSON.stringify(DATA_MOOK)
  localStorage.setItem('contactos', contactos_JSON)
}

export const obtenerContactos = () => {
  const contactosGuardados = localStorage.getItem('contactos')
  if(contactosGuardados){
    return JSON.parse(contactosGuardados)
  }
  else{
    guardarContacto(DATA_MOOK)
    return DATA_MOOK
  }
}

export const crearContacto = (contacto) => {
  const contactosGuardados = obtenerContactos()
  contactosGuardados.push(contacto)
  guardarContacto(contactosGuardados)
  return contactosGuardados
}

export const reiniciarContactos = () => {
  guardarContacto(contactos)
  return contactos
}