"use client"
import { Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/navigation';


const ButtonShopnow = () => {
    const router = useRouter();
    return (
        <Button onClick={() => router.push('/product')} type="default" className="transition-transform duration-300 ease-in-out hover:scale-105 hidden sm:inline-block">Shop Now</Button>
    );
}

export default ButtonShopnow;
