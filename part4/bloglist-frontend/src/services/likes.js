import axios from 'axios'
const baseUrl = '/api/likes'

const likes = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { likes }