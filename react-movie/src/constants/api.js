import axios from "axios";

const BaseURL = 'https://movienew.cybersoft.edu.vn'
const TokenCybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NCIsIkhldEhhblN0cmluZyI6IjE0LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNTY0NDgwMDAwMCIsIm5iZiI6MTY4NzcxMjQwMCwiZXhwIjoxNzE1NzkyNDAwfQ.cy8EAM6hrKh2o6c9THZW5lrKeOEmQXIDgFVyIf7K_rU'
export const MaNhom = 'GP09'
export const UserLogin = 'UserLogin'
export const AccessToken = 'AccessToken'


export const api = axios.create()
api.interceptors.request.use(config => {
   return {
      ...config,
      baseURL: BaseURL,
      headers: {
         TokenCybersoft: TokenCybersoft,
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(AccessToken))
      },
   }
})