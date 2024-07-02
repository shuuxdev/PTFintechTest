import api from "./configs/axiosConfig.js"

export const AuthAPI = {
    login: async function (payload, cancel = false) {
        const response = await api.request({
            url: `/login`,
            method: "POST",
            data: payload
        })
        // returning the token returned by the API
        return response
    },
    register: async function (payload, cancel = false) {
        const response = await api.request({
            url: `/register`,
            method: "POST",
            data: payload
        })

        return response.data.token
    },

}