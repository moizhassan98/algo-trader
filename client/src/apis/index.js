import axios from 'axios'
import { SERVER_API_URL } from '../config/urls'




const axiosObj = axios.create({
    baseURL: SERVER_API_URL,
})

const apiPermission = (payload, authToken) => axiosObj.post(`/apipermission`, payload, {headers: {"AuthToken": authToken}})
const saveApi = (payload, authToken) => axiosObj.post(`/saveapi`, payload, {headers: {"AuthToken": authToken}})

const getBrokersForUser = (authToken) => axiosObj.get(`/userbrokers`, {headers: {"AuthToken": authToken}})

const createBot = (payload, authToken) => axiosObj.post(`/createbot`, payload,  {headers: {"AuthToken": authToken}})
const getBotById = (botId,authToken) => axiosObj.get(`/bot/${botId}`,{headers: {"AuthToken": authToken}})
const getAllBots = (authToken) => axiosObj.get(`/bots`, {headers:{ "AuthToken": authToken}})

const createUser = (payload, authToken) => axiosObj.post(`/createuser`, payload,  {headers: {"AuthToken": authToken}})
const userExists = (authToken) => axiosObj.get(`/userexists`, {headers: {"AuthToken": authToken}})

const api = {
    createUser,
    userExists,

    apiPermission,
    saveApi,

    getBrokersForUser,

    getBotById,
    getAllBots,
    createBot,
}
export default api