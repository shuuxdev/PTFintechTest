import api from "./configs/axiosConfig.js"

export const TaskAPI = {
    get: async function (id, cancel = false) {
        const response = await api.request({
            url: `/task/${id}`,
            method: "GET",
            // retrieving the signal value by using the property name
        })
        // returning the product returned by the API
        return response.data
    },
    getAll: async function (id, cancel = false) {
        const response = await api.request({
            url: `/task/all`,
            method: "GET",
            // retrieving the signal value by using the property name
        })
        // returning the product returned by the API
        return response.data
    },
    getAssignedTasks: async function (cancel = false) {
        const response = await api.request({
            url: "/task/assigned",
            method: "GET",
        })

        return response.data
    },
    search: async function (name, cancel = false) {
        const response = await api.request({
            url: "/task/search/:name",
            method: "GET",
            params: {
                name: name,
            },
        })

        return response.data.tasks
    },
    createTask: async function (task, cancel = false) {
        const response = await api.request({
            url: `/task`,
            method: "POST",
            data: task,
        })
        return response.data;
    },
    updateTask: async function (task, cancel = false) {
        await api.request({
            url: `/task`,
            method: "PATCH",
            data: task,
        })
    },
    deleteTask: async function (taskId, cancel = false) {
        await api.request({
            url: `/task/${taskId}`,
            method: "DELETE",
        })
    },
}