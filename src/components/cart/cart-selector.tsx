"use client"
import { PlusOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Space } from 'antd';
import React, { useState } from 'react';
import { ICart } from '@/helper/type';
import { toast } from 'sonner';
import CartService from '@/service/cart.service';
import { useAppContext } from '@/app/app-provider';
import { useCartContext } from '@/app/cart-provider';

const CartSelector = ({ itemCart }: { itemCart: ICart }) => {
    const [quantity, setQuantity] = useState(itemCart.quantity);
    const { updateCart } = useCartContext();
    const { accessToken } = useAppContext();
    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({ token: accessToken, productId: itemCart.product._id, data: { size: itemCart.size, color: itemCart.color } });
            await updateCart();
            setQuantity(quantity + 1);
        } catch {
            toast.error('Thêm vào giỏ hàng thất bại');
        }
    }
    const handleRemoveToCart = async () => {
        try {
            await CartService.removeToCart({ token: accessToken, productId: itemCart.product._id, data: { size: itemCart.size, color: itemCart.color } });
            await updateCart();
            setQuantity(quantity - 1);
        } catch {
            toast.error('Xóa khỏi giỏ hàng thất bại');
        }
    }
    return (
        <Space className="mt-2">
            <Button
                icon={<MinusOutlined />}
                className='bg-gray-200 text-gray-700 hover:bg-gray-300'
                onClick={handleRemoveToCart}
            />
            <InputNumber
                min={1}
                value={quantity}
                className='bg-gray-200 text-gray-700 hover:bg-gray-300'
            />
            <Button
                icon={<PlusOutlined />}
                className='bg-gray-200 text-gray-700 hover:bg-gray-300'
                onClick={handleAddToCart}
            />
        </Space>
    );
}

export default CartSelector;
