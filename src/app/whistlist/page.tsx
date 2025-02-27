import React from 'react';
import { Metadata } from 'next';
import WhistlistPage from '@/app/whistlist/whistlist-page';

export const metadata: Metadata = {
    title: "Danh sách yêu thích",
    description: "Danh sách yêu thích",
};

const Page = () => {
    return (
        <WhistlistPage />
    );
}

export default Page;
