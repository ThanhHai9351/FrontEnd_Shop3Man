"use client"
import { useRouter } from 'next/navigation';
import { BellOutlined, HomeOutlined, LogoutOutlined, MessageOutlined, PlusSquareOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import React, { useState } from 'react';
import SearchSession from '@/components/social_mode/search-session';

const MenuSession = () => {
    const router = useRouter();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const showSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const handleCancel = () => {
        setIsSearchModalOpen(false);
    };

    return (
        <>
            <Menu
                mode="inline"
                theme="dark"
                style={{ background: '#121212', border: 'none' }}
                items={[
                    {
                        key: 'home',
                        icon: <HomeOutlined />,
                        label: 'Trang chủ',
                        onClick: () => {
                            router.push('/social');
                        }
                    },
                    {
                        key: 'search',
                        icon: <SearchOutlined />,
                        label: 'Tìm kiếm',
                        onClick: showSearchModal
                    },
                    {
                        key: 'messages',
                        icon: <MessageOutlined />,
                        label: 'Tin nhắn',
                        onClick: () => {
                            router.push('/social/conversation');
                        }
                    },
                    {
                        key: 'notifications',
                        icon: <BellOutlined />,
                        label: 'Thông báo',
                    },
                    {
                        key: 'create',
                        icon: <PlusSquareOutlined />,
                        label: 'Tạo',
                    },
                    {
                        key: 'profile',
                        icon: <UserOutlined />,
                        label: 'Trang cá nhân',
                    },
                    {
                        key: 'exit',
                        icon: <LogoutOutlined />,
                        label: 'Thoát chế độ mạng xã hội',
                        className: 'mt-auto',
                        onClick: () => {
                            router.push('/');
                        }
                    },
                ]}
            />

            <Modal
                title="Tìm kiếm"
                open={isSearchModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <SearchSession />
            </Modal>
        </>
    );
}

export default MenuSession;
