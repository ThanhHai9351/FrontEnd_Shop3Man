import ProductPage from '@/app/(customer)/product/product-page';
import React from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Sản phẩm",
    description: "Sản phẩm",
};
const Page = () => {
    return (
        <ProductPage />
    );
}

export default Page;
