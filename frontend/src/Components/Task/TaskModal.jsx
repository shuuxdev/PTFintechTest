// src/components/TaskModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { closeModal } from '../../Slices/modalSlice';
import { createTask, updateTask } from '../../Slices/tasksSlice.js';
import AsyncSelect from 'react-select/async';
import { userAPI } from '../../Apis/userAPI.js';
import useAuthInfo from '../../Hooks/useAuthInfo.jsx';
Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: 'none',
        borderRadius: '0.5rem',
        width: '90%',
        maxWidth: '500px',
        overflow: 'visible'
    },
};

const TaskModal = () => {
    const dispatch = useDispatch();
    const { isOpen, mode, task } = useSelector((state) => state.modal);
    const [{ assignedTo, label }, setAssigned] = useState({ assignedTo: null, setAssigned: null })
    const { roles } = useAuthInfo()
    let isAdmin = roles.includes("Admin");
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            status: 'To-Do',
            dueDate: '',
            assignedTo: '',
        },
    });
    useEffect(() => {
        const getUsernameByID = async () => {
            const user = await userAPI.get(task.assignedTo);
            setAssigned({ assignedTo: user.userId, label: user.username })
        }
        if (task) {
            getUsernameByID();
        }
        else {
            setAssigned({ assignedTo: null, label: null })
        }
    }, [task, setValue])
    useEffect(() => {
        if (task) {
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('status', task.status);
            setValue('dueDate', task.dueDate);
            setValue('assignedTo', task.assignedTo);
        }
        else {
            reset();
            setValue('title', null);
            setValue('description', null);
            setValue('status', null);
            setValue('dueDate', null);
            setValue('assignedTo', null);
        }
    }, [task, setValue]);

    const onSubmit = (data) => {
        if (!isAdmin) {
            let { assignedTo, ...dataWithoutAssignedTo } = data;
            data = dataWithoutAssignedTo;
        }
        if (mode === 'create') {
            dispatch(createTask(data));
        } else {
            dispatch(updateTask({ ...data, taskId: task.taskId }));
        }
        dispatch(closeModal());
        reset();
    };
    const onAsyncSelectChange = (selectedOption) => {
        setValue('assignedTo', selectedOption.value)
        const { label, value } = selectedOption;
        setAssigned({ assignedTo: value, label })
    }
    const loadOptions = async (inputValue) => {
        const users = await userAPI.search(inputValue);

        return users.map((user) => ({ value: user.userId, label: user.username }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeModal())}
            contentLabel="Task Modal"
            style={customStyles}
        >
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                    {mode === 'create' ? 'Add New Task' : 'Edit Task'}
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
                        <input
                            {...register('title', {
                                required: 'Title is required', maxLength: {
                                    value: 100,
                                    message: 'Title cannot exceed 100 characters'
                                }
                            })}
                            className="w-full px-4 py-2 border rounded"
                            id="title"
                            type="text"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                        <textarea
                            {...register('description', {
                                required: 'Description is required', maxLength: {
                                    value: 2000,
                                    message: 'Description cannot exceed 2000 characters'
                                }
                            })}
                            className="w-full px-4 py-2 border rounded"
                            id="description"
                            rows="4"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                        <select
                            {...register('status', { required: 'Status is required' })}
                            className="w-full px-4 py-2 border rounded"
                            id="status"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="dueDate">Due Date</label>
                        <input
                            {...register('dueDate', { required: 'Due Date is required' })}
                            className="w-full px-4 py-2 border rounded"
                            id="dueDate"
                            type="date"
                        />
                        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
                    </div>
                    {
                        isAdmin &&
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="assignedTo">Assign To</label>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={loadOptions}
                                defaultOptions
                                value={{ value: assignedTo, label: label }}
                                onChange={onAsyncSelectChange}

                            />
                        </div>
                    }
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => dispatch(closeModal())}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {mode === 'create' ? 'Add Task' : 'Update Task'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default TaskModal;
