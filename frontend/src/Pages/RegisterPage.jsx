import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AuthAPI } from '../Apis/authAPI.js';
import { useNavigate, Link } from 'react-router-dom';
import { Select } from 'antd';
import { RoleAPI } from '../Apis/roleAPI.js';
import { login } from '../Slices/authSlice.js';
import { setNotification } from '../Slices/notificationSlice.js';

const { Option } = Select;

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedRoles, setSelectedRoles] = useState([])
    const [roles, setRoles] = useState([])
    useEffect(() => {
        const fetchRoles = async () => {
            let roles = await RoleAPI.getAll();
            setRoles(roles);
        }
        fetchRoles();
    }, [])
    const onSubmit = async (data) => {
        try {
            const token = await AuthAPI.register(data);
            // Show success notification
            dispatch(setNotification({ message: 'Registration successful', type: 'success' }));
            // Navigate back to login page
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error (e.g., show error message to user)
            dispatch(setNotification({ message: 'Registration failed', type: 'error' }));
        }
    };

    // Function to handle onChange event of Select component
    const handleSelectChange = (selectedRoles) => {
        // Set selected roles to react-hook-form
        setValue('roles', selectedRoles);
        setSelectedRoles(selectedRoles)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-600">Role <span className='text-gray-400 text-[13px]'>P/S: for demo purpose</span></label>
                        <Select
                            mode="multiple"
                            placeholder="Select roles"
                            {...register('roles', { required: 'Role is required' })}
                            className="w-full"
                            showSearch={false}
                            onChange={handleSelectChange} // Call handleSelectChange on change
                            value={selectedRoles} // Set the initial value from react-hook-form
                        >
                            {roles.map((role) => (
                                <Option key={role.roleId} value={role.roleId}>{role.name}</Option>
                            ))}
                        </Select>
                        {errors.roles && <p className="text-red-500 text-sm">{errors.roles.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-500 hover:text-indigo-600">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
