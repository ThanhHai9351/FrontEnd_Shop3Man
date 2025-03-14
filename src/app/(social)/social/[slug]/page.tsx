"use client"
import React, { useEffect, useState } from "react";
import { Avatar, Button, Tabs, Row, Col, Typography, Divider, Image, Spin } from "antd";
import { UserOutlined, CheckOutlined, AppstoreOutlined, PlayCircleOutlined, TagOutlined } from "@ant-design/icons";
import AccountService from "@/service/account.service";
import { IAccount } from "@/helper/type";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ConversationService from "@/service/conversation.service";
const { Title, Text } = Typography;

const Page = () => {
    const [account, setAccount] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(true);
    const params = useParams();
    const accessToken = Cookies.get("accessToken") || "";
    const userId = Cookies.get("userId") || "";
    const router = useRouter();

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                setLoading(true);
                const response = await AccountService.getDetailAccount(accessToken, params.slug as string);
                if (response?.data) {
                    setAccount(response.data);
                }
            } catch (error) {
                console.error("Error fetching account:", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchAccountData();
        }
    }, [params.slug, accessToken]);


    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const stats = {
        posts: 6,
        followers: 1611,
        following: 165
    };

    const profileInfo = {
        name: "Thanh Hải",
        bio: "Nghệ thuật thị giác",
        location: "vnSGN | U30",
        tiktok: "www.tiktok.com/@dd14nm127_t=25-8uEOE4aJx2r&_r=1 + 1",
        tags: ["nhãm nhi", "Capeut", "Yêu mi đứa ✅", "II", "III Dương 2024"]
    };

    const tabItems = [
        {
            key: "1",
            label: <span style={{ color: "white" }}><AppstoreOutlined /> BÀI VIẾT</span>,
            children: (
                <Row gutter={[16, 16]}>
                    {Array.from({ length: stats.posts }).map((_, idx) => (
                        <Col xs={24} sm={12} md={8} key={idx}>
                            <div className="relative pb-[100%] overflow-hidden bg-gray-100 mb-4">
                                <Image
                                    src={`https://picsum.photos/300/300?random=${idx}`}
                                    alt="Post"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    preview={false}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>
            ),
        },
        {
            key: "2",
            label: <span style={{ color: "white" }}><PlayCircleOutlined /> REELS</span>,
            children: (
                <div className="text-center py-10">
                    <Text style={{ color: "white" }} type="secondary">Chưa có Reels nào</Text>
                </div>
            ),
        },
        {
            key: "3",
            label: <span style={{ color: "white" }}><TagOutlined /> ĐƯỢC GẮN THẺ</span>,
            children: (
                <div className="text-center py-10">
                    <Text style={{ color: "white" }} type="secondary">Chưa có bài viết nào được gắn thẻ</Text>
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <main className="flex-1 ml-64 flex items-center justify-center">
                <Spin size="large" />
            </main>
        );
    }

    const handleChat = async () => {
        try {
            const res = await ConversationService.createConversation({ token: accessToken || '', userId: params.slug as string });
            if (res.status === 201) {
                router.push(`/social/conversation`);
            }
        } catch (error) {
            console.error("Error creating conversation:", error);
        }
    }

    return (
        <main className="flex-1 ml-64 bg-black text-white">
            <div className="max-w-5xl mx-auto py-8 px-4">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                    <div className="mr-8 mb-4 md:mb-0">
                        <Avatar
                            size={150}
                            src={account?.avatarUrl || "/no-image.png"}
                            icon={<UserOutlined />}
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center mb-4">
                            <Title level={3} className="mb-0 mr-4" style={{ color: "white" }}>{account?.firstName} {account?.lastName}</Title>
                            {account?._id !== userId && <div className="flex mt-2 md:mt-0">
                                <Button
                                    type={isFollowing ? "default" : "primary"}
                                    onClick={handleFollow}
                                    className="mr-2 flex items-center"
                                    icon={isFollowing ? <CheckOutlined /> : null}
                                >
                                    {isFollowing ? "Đang theo dõi" : "Theo dõi"}
                                </Button>
                                <Button onClick={handleChat}>Nhắn tin</Button>
                            </div>}
                        </div>

                        <div className="flex mb-2 space-x-6 text-white">
                            <Text style={{ color: "white" }}><strong>{stats.posts}</strong> bài viết</Text>
                            <Text style={{ color: "white" }}><strong>{stats.followers}</strong> người theo dõi</Text>
                            <Text style={{ color: "white" }}><strong>{stats.following}</strong> đang theo dõi</Text>
                        </div>

                        <div className="mb-2">
                            <Text style={{ color: "white" }} strong className="block">{profileInfo.bio}</Text>
                            <Text style={{ color: "white" }} className="block">{profileInfo.location}</Text>
                            <Text style={{ color: "white" }} type="secondary" className="block">{profileInfo.tiktok}</Text>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {profileInfo.tags.map((tag, index) => (
                                <Text key={index} style={{ color: "black" }} className="bg-gray-100 px-2 py-1 rounded">
                                    {tag}
                                </Text>
                            ))}
                        </div>
                    </div>
                </div>

                <Divider style={{ margin: '12px 0' }} />

                {/* Tabs */}
                <Tabs defaultActiveKey="1" centered items={tabItems} />
            </div>
        </main>
    );
};

export default Page;