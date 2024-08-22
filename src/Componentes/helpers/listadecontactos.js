import { DATA_MOOK } from "../../Data/DATA_MOOK"

  const guardarContacto = (contactos) => {
    const contactos_JSON = JSON.stringify(contactos)
    localStorage.setItem('contactos', contactos_JSON)
  };
  
  export const obtenerContactos = () => {
    const contactosGuardados = localStorage.getItem('contactos')
    if (contactosGuardados) {
      return JSON.parse(contactosGuardados)
    } else {
      guardarContacto(DATA_MOOK)
      return DATA_MOOK
    }
  };

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