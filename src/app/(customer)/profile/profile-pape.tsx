"use client";
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Form, Input, Button, Avatar, Typography, Divider } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppContext } from '@/app/app-provider';
import AccountService from '@/service/account.service';
import { IAccount } from '@/helper/type';
import AddressSelector from '@/app/(customer)/profile/address-selector';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Content, Sider } = Layout;
const { Title } = Typography;

const ProfilePape = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { accessToken } = useAppContext();
    const [account, setAccount] = useState<IAccount | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await AccountService.getProfile(accessToken || "");
                setAccount(res.data);
                form.setFieldsValue(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [accessToken, form]);

    const handleUpdateProfile = async (values: IAccount) => {
        try {
            console.log('Updated values:', values);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const renderProfile = () => (
        <Card data-aos="fade-up">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
            >
                <div className="flex items-center mb-6" data-aos="fade-right" data-aos-delay="200">
                    <Avatar size={100} src={account?.avatarUrl} />
                    <div className="ml-4">
                        <Title level={4}>{account?.firstName} {account?.lastName}</Title>
                        <p className="text-gray-500">{account?.email}</p>
                    </div>
                </div>
                <Divider />
                <div data-aos="fade-up" data-aos-delay="400">
                    <Form.Item label="First Name" name="firstName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone">
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Profile
                    </Button>
                </div>
            </Form>
        </Card>
    );

    const renderSettings = () => (
        <Card data-aos="fade-up">
            <Title level={4}>Account Settings</Title>
            <Form layout="vertical" data-aos="fade-up" data-aos-delay="200">
                <Form.Item label="Change Password">
                    <Input.Password placeholder="Current Password" />
                </Form.Item>
                <Form.Item>
                    <Input.Password placeholder="New Password" />
                </Form.Item>
                <Form.Item>
                    <Input.Password placeholder="Confirm New Password" />
                </Form.Item>
                <Button type="primary">Update Password</Button>
            </Form>
        </Card>
    );

    const menuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Personal Information'
        },
        {
            key: 'addresses',
            icon: <HomeOutlined />,
            label: 'Manage Addresses'
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings'
        }
    ];

    return (
        <Layout className="min-h-screen bg-gray-100">
            <Layout>
                <Sider width={200} className="bg-white" data-aos="fade-right">
                    <Menu
                        className='p-2'
                        mode="inline"
                        selectedKeys={[activeTab]}
                        style={{ height: '100%' }}
                        onClick={({ key }) => setActiveTab(key)}
                        items={menuItems}
                    />
                </Sider>
                <Content className="p-6">
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'addresses' && <AddressSelector />}
                    {activeTab === 'settings' && renderSettings()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ProfilePape;
