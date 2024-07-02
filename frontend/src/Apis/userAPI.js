import api from "./configs/axiosConfig.js"

export const userAPI = {
    get: async function (id, cancel = false) {
        const response = await api.request({
            url: `/user?id=${id}`,
            method: "GET",
            // retrieving the signal value by using the property name
        })
        // returning the product returned by the API
        return response.data
    },
    getRole: async function (id, cancel = false) {
        const response = await api.request({
            url: `/user/role?userId=${id}`,
            method: "GET",
        })
        return response.data
    },
    search: async function (name, cancel = false) {
        const response = await api.request({
            url: `/user/search?keyword=${name}`,
            method: "GET",

        })
        return response.data
    },

}