import React from 'react';
import { Layout, Button, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../Slices/authSlice';
import useAuthInfo from '../../Hooks/useAuthInfo';
import 'tailwindcss/tailwind.css';

const { Header } = Layout;

const NavBar = () => {
    const { roles, username } = useAuthInfo();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const getRoleButtonClasses = (role) => {
        switch (role) {
            case 'Admin':
                return 'bg-red-500 text-white';
            default:
                return 'bg-blue-500 text-white'; // Customize this color as needed
        }
    };

    return (
        <Header className="bg-white shadow-md w-full flex justify-between items-center p-4">
            <div className="flex items-center w-full">
                <Avatar
                    src="https://www.redditstatic.com/avatars/avatar_default_01_FF4500.png" // Reddit-style avatar URL
                    className="mr-3"
                    size="large"
                />
                <span className="text-lg font-semibold">{username}</span>
                <div className="flex justify-between w-full">
                    <div className="ml-4 flex space-x-2">
                        {roles.map((role) => (
                            <Button
                                key={role}
                                className={`px-4 py-2 rounded ${getRoleButtonClasses(role)}`}
                            >
                                {role}
                            </Button>
                        ))}
                    </div>

                    <Button
                        className="px-4 py-2 rounded bg-gray-500 text-white"
                        onClick={handleLogout}
                    >
                        Signout
                    </Button>
                </div>
            </div>
        </Header>
    );
};

export default NavBar;
