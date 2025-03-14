"use client"
import { Avatar } from 'antd';
import { Card } from 'antd';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const StorySession = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true
        });
    }, []);
    return (
        <section className="mb-8 w-full" data-aos="fade-down">
            <Card
                className="bg-[#121212] border-none rounded-xl"
                bodyStyle={{ padding: '16px' }}
            >
                <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                    {[...Array(8)].map((_, i) => (
                        <div key={`story-${i}`} className="flex flex-col items-center flex-shrink-0">
                            <div className="relative w-16 h-16 bg-gradient-to-tr from-yellow-400 to-pink-600 rounded-full p-[2px]">
                                <div className="absolute inset-0 bg-black rounded-full z-10" style={{ margin: '2px' }}>
                                    <Avatar
                                        size={60}
                                        src={`/no-image.png`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <span className="text-xs mt-1 text-white truncate">user_{i + 1}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </section>
    );
}

export default StorySession;
