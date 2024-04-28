import axios from 'axios'

const baseURL = "http://127.0.0.1:8000/"

const getPubIDs = (searchdata) =>
{
    const request = axios.post(`${baseURL}esearch/`, searchdata)
    return request.then((response) => response.data)
}

const getPubDetails = (searchdata) =>
{
    console.log("Reached getPubDetails")
    const request = axios.post(`${baseURL}efetch/`, searchdata)
    return request.then((response) => response.data)
}

export default {getPubIDs, getPubDetails}