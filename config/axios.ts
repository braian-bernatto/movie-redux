import axios from 'axios'

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION}`
  }
})

export default clienteAxios
