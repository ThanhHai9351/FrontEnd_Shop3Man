"use client"
import { useAppContext } from '@/app/app-provider';
import React, { useEffect, useState } from 'react';
import { Avatar, Input, Button, Spin, Drawer } from 'antd';
import { SearchOutlined, EllipsisOutlined } from '@ant-design/icons';
import ConversationService from '@/service/conversation.service';
import Cookies from 'js-cookie';
import { timeRemaining } from '@/helper/format';
import { useConversation } from './conversation-context';
import { IConversation } from '@/helper/type';

const ConversationList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileVisible, setIsMobileVisible] = useState(false);
    const { accessToken } = useAppContext();
    const { conversations, setConversations, selectedConversation, setSelectedConversation } = useConversation();
    const user = JSON.parse(Cookies.get("user") || "{}");

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setIsLoading(true);
                const response = await ConversationService.getConversation({ token: accessToken });
                setConversations(response.data);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchConversations();
    }, [accessToken]);

    useEffect(() => {
        const handleToggleConversationList = () => {
            setIsMobileVisible(prev => !prev);
        };

        window.addEventListener('toggleConversationList', handleToggleConversationList);
        return () => {
            window.removeEventListener('toggleConversationList', handleToggleConversationList);
        };
    }, []);

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getOtherPartyName = (conversationName: string) => {
        const names = conversationName.split('-');
        const currentUserName = user.firstName + " " + user.lastName;
        return names[0] === currentUserName ? names[1] : names[0];
    };

    const handleConversationSelect = (item: IConversation) => {
        setSelectedConversation(item);
        setIsMobileVisible(false);
    };

    const ConversationContent = () => (
        <div className='h-full flex flex-col bg-white'>
            {/* Header */}
            <div className='p-4 border-b'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='font-semibold text-xl text-gray-900'>Messages</h2>
                    <Button type="text" icon={<EllipsisOutlined />} className='text-gray-900' />
                </div>
                <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="Search messages"
                    className='rounded-full bg-gray-100'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Conversations List */}
            <div className='overflow-y-auto flex-1'>
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <Spin />
                    </div>
                ) : (
                    <div className="divide-y">
                        {filteredConversations.map((item) => (
                            <div
                                key={item._id}
                                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${selectedConversation._id === item._id ? 'bg-gray-50' : ''
                                    }`}
                                onClick={() => handleConversationSelect(item)}
                            >
                                <div className='flex items-center'>
                                    <div className='relative'>
                                        <Avatar
                                            size={56}
                                            src={'https://upload-aws-cls.s3.us-east-2.amazonaws.com/hoodie.jpg'}
                                            className='border border-gray-200'
                                        />
                                        <div className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                            0
                                        </div>
                                    </div>
                                    <div className='ml-4 flex-1 min-w-0'>
                                        <div className='flex justify-between items-center mb-1'>
                                            <h4 className='font-semibold text-gray-900 truncate'>
                                                {getOtherPartyName(item.name)}
                                            </h4>
                                            <span className='text-xs text-gray-500 ml-2'>
                                                {timeRemaining(item.updatedAt)}
                                            </span>
                                        </div>
                                        <p className='text-sm text-gray-500 truncate'>
                                            {item.lastMessage || 'Start a conversation'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View */}
            <div className='w-[350px] bg-white border-r h-full hidden md:block'>
                <ConversationContent />
            </div>

            {/* Mobile View */}
            <Drawer
                placement="left"
                onClose={() => setIsMobileVisible(false)}
                open={isMobileVisible}
                width="100%"
                className='md:hidden'
            >
                <ConversationContent />
            </Drawer>
        </>
    );
}

export default ConversationList;
