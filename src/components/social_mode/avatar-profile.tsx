"use client"
import { IAccount } from '@/helper/type';
import AccountService from '@/service/account.service';
import { Avatar, Space } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useAppContext } from '@/app/app-provider';
import { useRouter } from 'next/navigation';
const AvatarProfile = () => {
    const { accessToken } = useAppContext();
    const [user, setUser] = useState<IAccount | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (accessToken) {
                    const response = await AccountService.getProfile(accessToken);
                    setUser(response.data);
                    Cookies.set("user", JSON.stringify(response.data));
                } else {
                    const savedUser = Cookies.get("user");
                    if (savedUser) {
                        setUser(JSON.parse(savedUser));
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUser();
    }, [accessToken]);

    return (
        <Space className='cursor-pointer' onClick={() => router.push(`/social/${user?._id}`)} size={16} style={{ marginBottom: 32 }}>
            <Avatar size={56} src={user?.avatarUrl || "/no-image.png"} />
            <Space direction="vertical" size={4}>
                <Typography.Text strong style={{ color: '#fff' }}>
                    {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : "Tên người dùng"}
                </Typography.Text>
                <Typography.Text style={{ color: '#8e8e8e', fontSize: 14 }}>
                    {user?.email || "Email người dùng"}
                </Typography.Text>
            </Space>
        </Space>
    );
}

export default AvatarProfile;
