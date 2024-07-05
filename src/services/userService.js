import axios from '../axios'

export const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

export const getAllUsers = (inputId) => {
    return axios.get(`/api/get-All-Users?id=${inputId}`)
}

export const createNewUserSevice = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

export const deleteUserSevice = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data:
            { id: userId }
    })
}

export const editUserSevice = (inputData) => {
    return axios.put(`/api/eidt-user`, inputData)
}

export const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}