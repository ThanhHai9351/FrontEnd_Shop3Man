import { Button, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useAppContext } from '@/app/app-provider';
import UserAddressService from '@/service/user-address.service';
import { IAddress } from '@/helper/type';
import { toast } from 'sonner';
const DialogCreateAddress = ({ fetchAddresses }: { fetchAddresses: () => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { accessToken } = useAppContext();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleSubmit = async (values: Omit<IAddress, "_id" | "userId">) => {
        try {
            await UserAddressService.createAddress({
                token: accessToken || "",
                data: values
            });
            toast.success("Address created successfully");
            fetchAddresses();
            handleCancel();
        } catch {
            toast.error("Error creating address");
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add New Address
            </Button>
            <Modal
                title="Create New Address"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={form.submit}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="District"
                        name="district"
                        rules={[{ required: true, message: 'Please input your district!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Street"
                        name="street"
                        rules={[{ required: true, message: 'Please input your street!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DialogCreateAddress;
