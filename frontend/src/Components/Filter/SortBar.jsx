import React from 'react';
import { Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const SortBar = ({ onSort, sortOrder }) => {
    return (
        <Button
            type="default"
            onClick={onSort}
            icon={sortOrder === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            style={{
                backgroundColor: 'white',
                borderColor: '#d9d9d9',
                color: '#000',
                width: 200,
            }}
        >
            Sort by Due Date
        </Button>
    );
};

export default SortBar;
