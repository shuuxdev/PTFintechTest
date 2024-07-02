import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice.js';
import tasksReducer from '../Slices/tasksSlice.js';
import modalReducer from '../Slices/modalSlice.js';
import notificationReducer from '../Slices/notificationSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        modal: modalReducer,
        notification: notificationReducer
    },
});