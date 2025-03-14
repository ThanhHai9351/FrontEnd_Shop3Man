import React from 'react';
import OrderPage from './order-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Order",
    description: "Order",
};
const Page = () => {
    return (
        <OrderPage />
    );
}

export default Page;
