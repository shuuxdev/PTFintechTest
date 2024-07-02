// src/redux/tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskAPI } from '../Apis/taskAPI.js';
import { setNotification } from './notificationSlice.js';
import { message } from 'antd';
import { getUserRoles } from '../Helpers/getUserRole.js';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    filter: 'all',
    sort: 'asc',
};

export const fetchAssignedTasks = createAsyncThunk('tasks/fetchAssignedTasks', async () => {
    const response = await TaskAPI.getAssignedTasks();
    return response;
});
export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
    const response = await TaskAPI.getAll();
    return response;
});
export const createTask = createAsyncThunk('tasks/createTask', async (task, { dispatch }) => {
    const response = await TaskAPI.createTask(task);

    dispatch(setNotification({ message: 'Task created successfully', type: 'success' }))
    return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task, { dispatch, getState }) => {
    let user = getState().auth;
    await TaskAPI.updateTask(task);
    const updatedTask = await TaskAPI.get(task.taskId);

    let isAdmin = getUserRoles(user.token).includes("Admin");
    if (!isAdmin) {
        dispatch(filterAssignedTasks({ assignedTo: updatedTask.assignedTo, taskId: updatedTask.taskId }));
    }
    dispatch(setNotification({ message: 'Task updated successfully', type: 'success' }))

    return updatedTask;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch }) => {
    await TaskAPI.deleteTask(taskId);

    dispatch(setNotification({ message: 'Task deleted successfully', type: 'success' }))
    return taskId;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTaskStatus(state, action) {
            const { taskId, status } = action.payload;
            const existingTask = state.items.find((task) => task.taskId === taskId);
            if (existingTask) {
                existingTask.status = status;
            }
        },
        filterTasks(state, action) {
            state.filter = action.payload;
        },
        filterAssignedTasks(state, action) {
            let { taskId, assignedTo } = action.payload
            let taskOwnerChanged = state.items.find(item => item.taskId == taskId).assignedTo != assignedTo;
            if (taskOwnerChanged)
                state.items = state.items.filter(item => item.taskId != taskId)

        },
        sortTasks(state, action) {
            state.sort = action.payload;
            // Sort tasks based on sort order (asc or desc)
            state.items.sort((a, b) => {
                if (state.sort === 'asc') {
                    return new Date(a.dueDate) - new Date(b.dueDate);
                } else {
                    return new Date(b.dueDate) - new Date(a.dueDate);
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssignedTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssignedTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAssignedTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const existingTask = state.items.find((task) => task.taskId === updatedTask.taskId);
                if (existingTask) {
                    existingTask.title = updatedTask.title;
                    existingTask.description = updatedTask.description;
                    existingTask.priority = updatedTask.priority;
                    existingTask.status = updatedTask.status;
                    existingTask.dueDate = updatedTask.dueDate;
                    existingTask.updatedAt = updatedTask.updatedAt;
                    existingTask.assignedTo = updatedTask.assignedTo;
                    // Assuming labels might need to be updated similarly if handled in the frontend
                }

            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter((task) => task.taskId !== action.payload);
            });
    },
});

export const { updateTaskStatus, filterTasks, sortTasks, filterAssignedTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
