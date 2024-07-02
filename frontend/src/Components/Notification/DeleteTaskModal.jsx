import React from 'react';
import { Modal } from 'antd';

const DeleteTaskModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Confirm Delete"
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Delete"
            cancelText="Cancel"
        >
            <p>Are you sure you want to delete this task?</p>
        </Modal>
    );
};

export default DeleteTaskModal;
