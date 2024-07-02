// Notification.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../Slices/notificationSlice.js';
import { notification } from 'antd';

const Notification = () => {
    const dispatch = useDispatch();
    const { message, type } = useSelector((state) => state.notification);

    const handleClose = () => {
        dispatch(clearNotification());
    };

    React.useEffect(() => {
        if (message) {
            notification[type]({
                message: 'Notification',
                description: message,
                placement: "bottomRight",
                onClose: handleClose,
            });
        }
    }, [message, type]);

    return null;
};

export default Notification;
