// src/components/PlusButton.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { openModal } from '../../Slices/modalSlice';
const PlusButton = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(openModal({ mode: 'create' }));
    };
    return (
        <>
            <button
                onClick={handleClick}
                className=" bg-white text-gray-500 hover:bg-slate-100 rounded-full shadow-lg p-3"
            >
                <FaPlus className="w-3 h-3" />
            </button>
        </>
    );
};

export default PlusButton;
