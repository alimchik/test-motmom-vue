import axios from 'axios'

export const myAxios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    Autorization: localStorage.getItem('token')
  }
})
