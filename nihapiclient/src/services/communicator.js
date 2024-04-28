import axios from 'axios'

const baseURL = "http://127.0.0.1:8000/post/"

const getPubIDs = (searchdata) =>
{
    const request = axios.post(`${baseURL}`, searchdata)
    return request.then((response) => response.data)
}

export default {getPubIDs}