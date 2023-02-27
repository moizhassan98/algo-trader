import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SERVER_API_URL } from '../config/urls'




const axiosObj = axios.create({
    baseURL: SERVER_API_URL
})

const apiPermission = (payload, authToken) => axiosObj.post(`/apipermission`, payload, {headers: {"AuthToken": authToken}})
const saveApi = (payload, authToken) => axiosObj.post(`/saveapi`, payload, {headers: {"AuthToken": authToken}})

const api = {
    apiPermission,
    saveApi,
}
export default api