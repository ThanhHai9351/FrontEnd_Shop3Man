import { useAppContext } from '@/app/app-provider';
import UserAddressService from '@/service/user-address.service';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ButtonDeleteAddress = ({ id, fetchAddresses }: { id: string, fetchAddresses: () => void }) => {
    const { accessToken } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await UserAddressService.deleteAddress({ token: accessToken || "", id });
            toast.success("Address deleted successfully");
            fetchAddresses();
        } catch {
            toast.error("Error deleting address");
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Button danger onClick={() => setIsModalOpen(true)}>Delete</Button>
            <Modal
                title="Delete Address"
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsModalOpen(false)}
                okText="Yes"
                okType="danger"
                cancelText="No"
            >
                Are you sure you want to delete this address?
            </Modal>
        </>
    );
};

export default ButtonDeleteAddress;
