// SearchBar.js
import React from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
    return (
        <Search
            placeholder="Search tasks by title"
            enterButton={
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    style={{
                        backgroundColor: 'white',
                        borderColor: '#d9d9d9',
                        color: '#000',
                    }}
                >
                    Search
                </Button>
            }
            size="large"
            onChange={onSearch}
        />
    );
};

export default SearchBar;
