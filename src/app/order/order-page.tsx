"use client"
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Divider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IOrder } from '@/helper/type';
import OrderService from '@/service/order.service';
import { useAppContext } from '../app-provider';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/helper/formatPrice';
import ButtonDetailOrder from '@/app/order/button-detail-order';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderPage = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { accessToken } = useAppContext();

    useEffect(() => {
        let isMounted = true;
        const fetchOrders = async () => {
            try {
                const response = await OrderService.getAll({ token: accessToken || '' });

                if (isMounted) {
                    setOrders(Array.isArray(response.data.data) ? response.data.data : []);
                }
            } catch {
                if (isMounted) setOrders([]);
            }
        };

        fetchOrders();
        return () => {
            isMounted = false;
        };
    }, [accessToken]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
            easing: 'ease-in-out'
        });
    }, []);

    const columns: ColumnsType<IOrder> = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <span className="font-medium" data-aos="fade-right" data-aos-delay="100">{text}</span>,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (amount) => (
                <span className="font-medium text-red-600" data-aos="fade-right" data-aos-delay="200">
                    {formatPrice(amount || 0)}
                </span>
            ),
        },
        {
            title: 'Payment Date',
            dataIndex: 'paidAt',
            key: 'paidAt',
            render: (date) => <span data-aos="fade-right" data-aos-delay="300">{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>,
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (method) => <span className="capitalize" data-aos="fade-right" data-aos-delay="400">{method || 'N/A'}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'blue';
                switch (status?.toLowerCase()) {
                    case 'success':
                        color = 'green';
                        break;
                    case 'pending':
                        color = 'orange';
                        break;
                    case 'cancel':
                        color = 'red';
                        break;
                }
                return <Tag color={color} data-aos="fade-right" data-aos-delay="500">{status?.toUpperCase() || 'UNKNOWN'}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <div data-aos="zoom-in" data-aos-delay="600">
                    <ButtonDetailOrder order={record} />
                </div>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mx-3" data-aos="fade-down" data-aos-duration="800">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">My Orders</h1>
                <Breadcrumb
                    className="mb-8"
                    items={[{ title: "Home", className: "cursor-pointer hover:underline", onClick: () => router.push('/') }, { title: "Orders" }]}
                />
            </div>
            <Divider data-aos="fade-right" data-aos-duration="800" />
            <div className="shadow-md rounded-lg bg-white p-4" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey={(record) => record._id}
                    pagination={{ pageSize: 10 }}
                    className="hover:shadow-xl transition-all duration-300"
                />
            </div>
        </div>
    );
}

export default OrderPage;
