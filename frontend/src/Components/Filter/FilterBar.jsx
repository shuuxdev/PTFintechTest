import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const FilterBar = ({ onFilter }) => {
    return (
        <Select
            placeholder="Filter by status"
            onChange={onFilter}
            style={{
                width: 200,
                backgroundColor: 'white',
                borderColor: '#d9d9d9',
                color: '#000',
            }}
            dropdownStyle={{ backgroundColor: 'white' }}
        >
            <Option value="all">All</Option>
            <Option value="to-do">To-do</Option>
            <Option value="in progress">In-progress</Option>
            <Option value="completed">Completed</Option>
        </Select>
    );
};

export default FilterBar;
