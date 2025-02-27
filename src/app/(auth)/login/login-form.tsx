"use client"
import React, { useEffect } from 'react';
import { Input, Button, Form, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AccountService from '@/service/account.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Cookies from "js-cookie";
import { useAppContext } from '@/app/app-provider';
const LoginForm = () => {
    const { setAccessToken } = useAppContext();
    const router = useRouter();
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const onFinish = async (values: { email: string, password: string }) => {
        try {
            const response = await AccountService.login(values);
            if (response.status === 200) {
                toast.success('Login successful');
                Cookies.set("accessToken", response.data.accessToken);
                Cookies.set("refreshToken", response.data.refreshToken);
                setAccessToken(response.data.accessToken);
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            }

            if (response.status === 400) {
                toast.error('Invalid email or password');
            }
        } catch {
            toast.error('Login failed');
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
                        Sign in to your account
                    </h2>
                </div>
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            size="large"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default LoginForm;
