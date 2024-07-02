// UserFilter.jsx
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { userAPI } from '../../Apis/userAPI';

const { Option } = Select;

const UserFilter = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true);
            try {
                const response = await userAPI.search('');
                setUsers(response); // Assuming response.data contains the list of users
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersData();
    }, []);

    const handleChange = (value) => {
        onSelectUser(value); // Pass selected user ID to parent component
    };

    return (
        <div className="flex items-center space-x-4">

            <Select
                placeholder="Filter by user"
                style={{ width: 200 }}
                loading={loading}
                onChange={handleChange}
            >
                <Option value={null}>All</Option>
                {users.map((user) => (
                    <Option key={user.userId} value={user.userId}>
                        {user.username}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default UserFilter;
