import CategoryPage from '@/app/category/category-page';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Thể loại",
    description: "Thể loại",
};

const Page = () => {
    return (
        <CategoryPage />
    );
}

export default Page;
