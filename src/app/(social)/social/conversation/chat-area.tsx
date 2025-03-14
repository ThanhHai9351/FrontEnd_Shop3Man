"use client";
import React, { useEffect, useState, useRef } from "react";
import { Avatar, Input, Button, List, Space } from "antd";
import { SendOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { IMessage } from "@/helper/type";
import { useAppContext } from "@/app/app-provider";
import { useConversation } from "./conversation-context";
import MessageService from "@/service/message.service";
import { formatDate } from "@/helper/format";
import Cookies from "js-cookie";
import io, { Socket } from "socket.io-client";

const ChatArea = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { accessToken } = useAppContext();
    const { selectedConversation, updateConversation } = useConversation();
    const userId = Cookies.get("userId") || "";
    const user = JSON.parse(Cookies.get("user") || "{}");
    const socketRef = useRef<Socket>(io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"));
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (selectedConversation._id) {
            fetchMessages();
        }
    }, [selectedConversation._id]);

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response = await MessageService.getMessages({
                token: accessToken,
                conversationId: selectedConversation._id || "",
            });
            setMessages(response.data || []);
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedConversation._id) return;

        socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");
        const socket = socketRef.current;

        socket.emit("joinRoom", selectedConversation._id);

        socket.on("messageReceived", () => {
            fetchMessages();
            scrollToBottom();
        });

        return () => {
            socket.off("messageReceived");
            socket.disconnect();
        };
    }, [selectedConversation._id]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !socketRef.current) return;

        const messageData = {
            conversationId: selectedConversation._id || "",
            senderId: userId || "",
            content: newMessage.trim(),
        };

        try {
            socketRef.current.emit("sendMessage", messageData);
            setMessages(prev => [...prev, { ...messageData, createdAt: new Date().toISOString() } as IMessage]);
            updateConversation(selectedConversation._id, newMessage.trim());
            setNewMessage("");
            scrollToBottom();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!selectedConversation._id) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col w-full h-full">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b flex items-center sticky top-0 z-10">
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    className='md:hidden mr-2'
                    onClick={() => {
                        const event = new CustomEvent('toggleConversationList');
                        window.dispatchEvent(event);
                    }}
                />
                <Avatar
                    size={40}
                    src="https://upload-aws-cls.s3.us-east-2.amazonaws.com/hoodie.jpg"
                />
                <div className="ml-4">
                    <h3 className="font-semibold text-gray-700">
                        {selectedConversation.name.split('-')[0] === user.firstName + " " + user.lastName
                            ? selectedConversation.name.split('-')[1]
                            : selectedConversation.name.split('-')[0]}
                    </h3>
                    <p className="text-gray-500 text-sm">Active now</p>
                </div>
                <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    className="ml-auto"
                />
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {isLoading ? (
                    <div className="flex justify-center p-4">
                        <span>Loading messages...</span>
                    </div>
                ) : (
                    <List
                        dataSource={messages}
                        renderItem={(item) => (
                            <div
                                className={`flex ${item.senderId === userId ? "justify-end" : "justify-start"} mb-4`}
                            >
                                {item.senderId !== userId && (
                                    <Avatar
                                        src={"https://joeschmoe.io/api/v1/random"}
                                        className="mr-3"
                                    />
                                )}
                                <div>
                                    <div
                                        className={`${item.senderId === userId
                                            ? "bg-blue-500 text-white"
                                            : "bg-white"
                                            } p-3 rounded-2xl max-w-xs shadow-sm`}
                                    >
                                        {item.content}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {formatDate(item.createdAt)}
                                    </div>
                                </div>
                                {item.senderId === userId && (
                                    <Avatar
                                        src={"https://joeschmoe.io/api/v1/random"}
                                        className="ml-3"
                                    />
                                )}
                            </div>
                        )}
                    />
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t sticky bottom-0">
                <Space.Compact className="flex w-full">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onPressEnter={sendMessage}
                        placeholder="Type a message..."
                        className="flex-1 rounded-l-full py-2 px-4"
                        disabled={isLoading}
                    />
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={sendMessage}
                        className="rounded-r-full"
                        disabled={!newMessage.trim() || isLoading}
                    >
                        Send
                    </Button>
                </Space.Compact>
            </div>
        </div>
    );
};

export default ChatArea;
