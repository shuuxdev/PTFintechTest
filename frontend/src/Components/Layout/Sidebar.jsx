import React from 'react';
import { motion } from 'framer-motion';
import { FaTasks, FaRegCalendarAlt, FaInbox, FaUserFriends, FaChartLine, FaStar } from 'react-icons/fa';

const Sidebar = () => {
    const sidebarItems = [
        { icon: FaTasks, text: 'My Tasks' },
        { icon: FaRegCalendarAlt, text: 'My Plan' },
        { icon: FaInbox, text: 'Inbox' },
        { icon: FaUserFriends, text: 'People' },
        { icon: FaChartLine, text: 'Reporting' }
    ];

    const favoriteItems = [
        { icon: FaStar, text: 'App Development' },
        { icon: FaStar, text: 'Creative Project' }
    ];

    const listItemVariants = {
        hover: {
            width: '100%', // Expand width on hover
            transition: {
                duration: 0.3,
            },
        },
    };

    const listItems = (items) =>
        items.map((item, index) => (
            <motion.li
                key={index}
                className="relative flex items-center text-gray-300 cursor-pointer"
                style={{ overflow: 'hidden' }}
            >
                <motion.div
                    className="absolute left-0 top-0 h-full bg-green-500"
                    variants={listItemVariants}
                    initial={{ width: 0 }}
                    whileHover="hover"
                />
                <item.icon className="mr-2" />
                {item.text}
            </motion.li>
        ));

    return (
        <div className="w-64 bg-[#201c3c] p-4 flex flex-col">
            <div className="text-2xl font-bold mb-6 text-gray-200">Home</div>
            <ul className="space-y-4">
                {listItems(sidebarItems)}
            </ul>
            <div className="mt-8">
                <h3 className="text-lg font-bold mb-2 text-gray-200">Favorites</h3>
                <ul className="space-y-4">
                    {listItems(favoriteItems)}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
