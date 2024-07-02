import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openModal } from '../../Slices/modalSlice.js';
export const TaskItem = ({ task, onDelete }) => {
    const { title, description, status, dueDate } = task;

    const statusColor = {
        'To-Do': 'bg-yellow-500',
        'In Progress': 'bg-blue-500',
        'Pending': 'bg-red-500',
        'Completed': 'bg-green-500',
    };
    const dispatch = useDispatch();
    const controls = useAnimation();

    const handleMouseEnter = () => {
        controls.start({ opacity: 1, x: 0 });
    };

    const handleMouseLeave = () => {
        controls.start({ opacity: 0, x: 20 });
    };
    const handleEdit = () => {
        dispatch(openModal({ mode: 'edit', task }));
    };
    return (
        <div
            className="relative bg-white shadow-lg rounded-lg hover:border-red-500 hover:scale-105 border-transparent border-[1px] p-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <div className='min-h-[150px]'>

                <p className="text-gray-700 mb-4">{description}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className={`text-white text-[14px] px-4 py-2 rounded-xl ${statusColor[status]}`}>
                    {status}
                </button>
                <span className="text-gray-600">{new Date(dueDate).toLocaleDateString()}</span>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={controls}
                transition={{ duration: 0.3 }}
                className="absolute top-6 right-4 rounded-md flex justify-end space-x-4"
            >
                <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                >
                    <FaEdit className="w-5 h-5" />
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                    <FaTrash className="w-5 h-5" />
                </button>
            </motion.div>
        </div>
    );
};
