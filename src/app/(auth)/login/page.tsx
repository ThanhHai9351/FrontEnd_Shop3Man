import React from 'react';
import LoginForm from './login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Đăng nhập",
};

const Page = () => {
    return (
        <LoginForm />
    );
}

export default Page;
