"use client"
import { IAccount } from '@/helper/type';
import AccountService from '@/service/account.service';
import { Button, Space } from 'antd';
import { Avatar } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/app-provider';

const SuggestFriend = () => {
    const [suggestedFriends, setSuggestedFriends] = useState<IAccount[]>([]);
    const { accessToken } = useAppContext();
    useEffect(() => {
        const fetchSuggestedFriends = async () => {
            const response = await AccountService.getAllAccounts(accessToken, { limit: 10 });
            setSuggestedFriends(response.data.data);
        };
        fetchSuggestedFriends();
    }, []);
    return (
        <div>
            <Typography.Text strong style={{ color: '#8e8e8e', display: 'block', marginBottom: 16 }}>
                Gợi ý cho bạn
            </Typography.Text>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {suggestedFriends.map(friend => (
                    <div key={friend._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Space size={12}>
                            <Avatar src={friend.avatarUrl || "/no-image.png"} size={40} />
                            <Space direction="vertical" size={2}>
                                <Typography.Text style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{friend.firstName} {friend.lastName}</Typography.Text>
                                <Typography.Text style={{ color: '#8e8e8e', fontSize: 12 }}>Gợi ý cho bạn</Typography.Text>
                            </Space>
                        </Space>
                        <Button type="text" style={{ color: '#0095f6', fontSize: 14 }} className="hover:text-[#1aa3ff]">
                            Theo dõi
                        </Button>
                    </div>
                ))}
            </Space>
        </div>
    );
}

export default SuggestFriend;
