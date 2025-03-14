'use client'
import React, { createContext, useContext, useState } from 'react';
import { IConversation } from '@/helper/type';

interface ConversationContextType {
    conversations: IConversation[];
    setConversations: (conversations: IConversation[]) => void;
    selectedConversation: IConversation;
    setSelectedConversation: (conversation: IConversation) => void;
    updateConversation: (conversationId: string, lastMessage: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error('useConversation must be used within a ConversationProvider');
    }
    return context;
};

export const ConversationProvider = ({ children }: { children: React.ReactNode }) => {
    const [conversations, setConversations] = useState<IConversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<IConversation>({} as IConversation);

    const updateConversation = (conversationId: string, lastMessage: string) => {
        setConversations(prev =>
            prev.map(conv =>
                conv._id === conversationId
                    ? { ...conv, lastMessage, updatedAt: new Date().toISOString() }
                    : conv
            )
        );
    };

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                setConversations,
                selectedConversation,
                setSelectedConversation,
                updateConversation
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
}; 