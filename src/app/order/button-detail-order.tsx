import { ICart, IOrder } from "@/helper/type";
import { Button, Modal, Table, Typography, Descriptions } from "antd";
import React, { useState } from "react";
import { formatPrice } from "@/helper/formatPrice";
import Image from "next/image";

const { Title } = Typography;

const ButtonDetailOrder = ({ order }: { order: IOrder }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            title: "Product Name",
            dataIndex: ["product", "name"],
            key: "name",
            render: (text: string) => <span className="font-medium">{text}</span>,
        },
        {
            title: "Image",
            dataIndex: ["product", "imageUrl"],
            key: "image",
            render: (text: string) => (
                <Image
                    src={text || "/no-image.png"}
                    alt="product"
                    width={100}
                    height={100}
                />
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            key: "total",
            render: (_: unknown, record: ICart) => (
                <span className="text-red-500 font-semibold">
                    {formatPrice(record.price)}
                </span>
            ),
        },
    ];

    return (
        <>
            <Button
                type="primary"
                onClick={showModal}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg px-4 py-2"
            >
                View Details
            </Button>
            <Modal
                title={
                    <Title level={4} className="text-blue-700">
                        Order Details
                    </Title>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
                className="p-4 rounded-lg shadow-lg"
            >
                <Descriptions bordered column={2} className="p-4 bg-gray-50 rounded-lg">
                    <Descriptions.Item label="Order ID">
                        <span className="font-medium">{order._id}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <span
                            className={`px-2 py-1 rounded-md ${order.status === "success"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Method">
                        <span className="italic">{order.paymentMethod}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Payment Date">
                        {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping Address" span={2}>
                        <span className="text-gray-600">{`${order.address.street}, ${order.address.district}, ${order.address.city}`}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Amount" span={2}>
                        <span className="text-red-600 font-medium text-lg">
                            {formatPrice(order.totalMoney)}
                        </span>
                    </Descriptions.Item>
                </Descriptions>

                <div className="mt-6">
                    <Title level={5} className="text-gray-800">
                        Order Items
                    </Title>
                    <Table
                        columns={columns}
                        dataSource={order.items}
                        pagination={false}
                        rowKey={(record) => record.product._id}
                        className="mt-2 border border-gray-200 shadow-sm rounded-lg"
                    />
                </div>
            </Modal>
        </>
    );
};

export default ButtonDetailOrder;
