import axios from 'axios';


const Api = axios.create({
    baseURL: 'http://172.18.9.171:3333'
})

export default Api;