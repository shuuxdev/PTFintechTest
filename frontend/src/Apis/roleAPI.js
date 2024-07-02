import api from "./configs/axiosConfig.js"

export const RoleAPI = {
    getAll: async function (cancel = false) {
        const response = await api.request({
            url: `/role/all`,
            method: "get",
        })
        // returning the token returned by the API
        return response.data
    }
}