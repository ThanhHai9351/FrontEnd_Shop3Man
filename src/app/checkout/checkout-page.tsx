"use client"
import React from 'react';
import { Card, Typography, Space, Button, Radio, Form } from 'antd';
import Image from 'next/image';
import { useCartContext } from '@/app/cart-provider';
import { useAppContext } from '@/app/app-provider';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/helper/formatPrice';
import { v4 as uuidv4 } from 'uuid';
import VnpayService from '@/service/vnpay.service';
import { toast } from 'sonner';

const { Text, Title } = Typography;

const CheckoutPage = () => {
    const { cartItems } = useCartContext();
    const { accessToken } = useAppContext();
    const router = useRouter();
    const [form] = Form.useForm();

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleCheckout = async () => {
        try {
            const orderId = uuidv4();
            const amount = totalAmount;
            const response = await VnpayService.createUrl({ token: accessToken, data: { orderId, amount } });
            window.location.href = response;
        }
        catch {
            toast.error("Lỗi khi tạo url thanh toán");
        }

    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <div className="text-center py-8">
                        <Title level={3}>Your cart is empty</Title>
                        <Button type="primary" onClick={() => router.push('/')}>
                            Continue Shopping
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Title level={2}>Checkout</Title>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card title="Order Items">
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex gap-4 border-b pb-4">
                                    <Image
                                        src={item.product?.imageUrl || 'https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg'}
                                        alt={item.product?.name || ''}
                                        width={100}
                                        height={100}
                                        className="object-cover"
                                    />
                                    <div className="flex-1">
                                        <Text strong>{item.product?.name}</Text>
                                        <div className="text-sm text-gray-500">
                                            <div>Color: <span className='text-gray-700'>{item.color}</span></div>
                                            <div>Size: <span className='text-gray-700'>{item.size}</span></div>
                                            <div>Quantity: <span className='text-gray-700'>{item.quantity}</span></div>
                                            <div>Price: <span className='text-red-600 font-medium'>
                                                {formatPrice(item.price)}
                                            </span></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card title="Order Summary">
                        <Form form={form} onFinish={handleCheckout} layout="vertical">
                            <div className="mb-4">
                                <Text strong>Payment Method:</Text>
                                <Form.Item name="paymentMethod" className="mt-2">
                                    <Radio.Group defaultValue="vnpay">
                                        <Space direction="vertical">
                                            <Radio value="vnpay">
                                                <Space>
                                                    <Image src="/vnpay-logo.png" alt="VNPay" width={60} height={30} />
                                                    VNPay
                                                </Space>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <Text>Subtotal:</Text>
                                    <Text>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</Text>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <Text strong>Total:</Text>
                                    <Text strong className="text-red-600">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                                    </Text>
                                </div>

                                <Button type="primary" htmlType="submit" block size="large">
                                    Proceed to Payment
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
