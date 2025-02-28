import Logo from '@/components/logo';
import AvatarBar from '@/components/ui/avatar_bar';
import ButtonShopnow from '@/components/ui/button-shopnow';
import CartBar from '@/components/cart/cart-bar';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Link from 'next/link';
import React from 'react';

const Header = async () => {
    return (
        <nav className="bg-white flex flex-wrap items-center justify-between px-4 h-16 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="flex items-center gap-4 sm:gap-8">
                <Logo width={40} className='text-black' />
                <ButtonShopnow />
                <Input
                    placeholder="What are you looking for..."
                    prefix={<SearchOutlined />}
                    className="w-40 sm:w-64 transition-all duration-300 ease-in-out focus:w-48 sm:focus:w-72"
                />
            </div>

            <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                <div className="flex gap-2">
                    <Link className='text-gray-600 hover:text-gray-800 cursor-pointer underline text-xs sm:text-sm p-1 sm:p-2' href="/category">categories</Link>
                    <Link className='text-gray-600 hover:text-gray-800 cursor-pointer underline text-xs sm:text-sm p-1 sm:p-2' href="/product">products</Link>
                </div>
                <AvatarBar />
                <CartBar />
            </div>
        </nav>
    );
}

export default Header;
