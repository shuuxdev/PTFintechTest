// src/features/modal/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    mode: 'create', // 'create' or 'edit'
    task: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal(state, action) {
            state.isOpen = true;
            state.mode = action.payload.mode;
            state.task = action.payload.task || null;
        },
        closeModal(state) {
            state.isOpen = false;
            state.mode = 'create';
            state.task = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
