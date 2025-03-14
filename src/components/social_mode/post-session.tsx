"use client"
import { BookOutlined } from '@ant-design/icons';
import { CommentOutlined, SendOutlined } from '@ant-design/icons';
import ActionButton from '@/components/social_mode/action-button';
import { HeartOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Avatar, Button } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const generatePosts = () => [
    {
        id: 1,
        user: { name: "Thanh Hải", avatar: "/no-image.png" },
        images: ["/no-image.png"],
        likes: 9714,
        comments: 24,
        description: "tóc dài comeback @moodie.girls_",
        timeAgo: "1 ngày",
    },
    {
        id: 2,
        user: { name: "Thanh Hải", avatar: "/no-image.png" },
        images: ["/no-image.png"],
        likes: 9714,
        comments: 24,
        description: "tóc dài comeback @moodie.girls_",
        timeAgo: "1 ngày",
    },
];
const PostSession = () => {
    const posts = useMemo(() => generatePosts(), []);

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true
        });
    }, []);
    return (
        <div className="space-y-6 max-w-[800px]">
            {posts.map((post) => (
                <article
                    key={post.id}
                    className="bg-[#121212] rounded-xl overflow-hidden shadow-xl"
                    data-aos="fade-up"
                >
                    {/* Post Header */}
                    <header className="flex items-center justify-between p-4 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <Avatar
                                src={post.user.avatar || "/no-image.png"}
                                size={40}
                                className="border-2 border-pink-500"
                            />
                            <div>
                                <h3 className="font-semibold text-white">{post.user.name}</h3>
                                <p className="text-gray-400 text-xs">{post.timeAgo}</p>
                            </div>
                        </div>
                        <Button
                            type="text"
                            className="text-gray-400 hover:text-white"
                            aria-label="More options"
                        >
                            <span className="text-2xl">⋯</span>
                        </Button>
                    </header>

                    {/* Post Image */}
                    <div className="relative aspect-square">
                        <Image
                            src={post.images[0]}
                            alt="Post content"
                            fill
                            sizes="(max-width: 768px) 100vw, 630px"
                            className="object-cover"
                            quality={90}
                            priority
                        />
                    </div>

                    {/* Post Actions */}
                    <section className="p-4">
                        <div className="flex justify-between mb-3">
                            <Space size="middle">
                                <ActionButton icon={<HeartOutlined />} aria="Like" />
                                <ActionButton icon={<CommentOutlined />} aria="Comment" />
                                <ActionButton icon={<SendOutlined />} aria="Share" />
                            </Space>
                            <ActionButton icon={<BookOutlined />} aria="Save" />
                        </div>

                        {/* Engagement Metrics */}
                        <div className="text-sm space-y-2">
                            <p className="font-semibold text-white">
                                {post.likes.toLocaleString()} lượt thích
                            </p>
                            <p className="text-white">
                                <span className="font-semibold">{post.user.name}</span>
                                <span className="ml-2">{post.description}</span>
                            </p>
                            <Button
                                type="text"
                                className="text-gray-400 p-0 hover:text-white"
                            >
                                Xem tất cả {post.comments} bình luận
                            </Button>
                        </div>
                    </section>
                </article>
            ))}
        </div>
    );
};

export default PostSession;
