"use client"
import React from 'react';
import ConversationList from '@/app/(social)/social/conversation/conversation-list';
import ChatArea from '@/app/(social)/social/conversation/chat-area';
import { ConversationProvider } from './conversation-context';

const Page = () => {
    return (
        <ConversationProvider>
            <main className='flex-1 bg-white min-h-screen'>
                <div className='flex h-screen mx-64'>
                    <div className='hidden md:block'>
                        <ConversationList />
                    </div>
                    <div className="flex w-full">
                        <ChatArea />
                    </div>
                </div>
            </main>
        </ConversationProvider>
    );
};

export default Page;