"use client"
import React, { useEffect } from 'react';
import { Input, Button, Form, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccountService, { DTORegister } from '@/service/account.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const onFinish = async (values: { firstName: string, lastName: string, email: string, password: string, repassword: string }) => {
        if (values.password !== values.repassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const data: DTORegister = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password
            }
            const response = await AccountService.register(data);
            if (response.status === 201) {
                toast.success('Registration successful');
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }

            if (response.status === 400) {
                toast.error('Registration failed');
            }
        } catch {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card
                className="w-full max-w-md"
                data-aos="fade-up"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="First Name"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Last Name"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="repassword"
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="large"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Page;
