import { useAppContext } from '@/app/app-provider';
import { useCartContext } from '@/app/cart-provider';
import CartService from '@/service/cart.service';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { toast } from 'sonner';

const ButtonAddToCart = ({ size, color, productId }: { size: number, color: string, productId: string }) => {
    const { accessToken } = useAppContext();
    const { updateCart } = useCartContext();
    const handleAddToCart = async () => {
        try {
            await CartService.addToCart({ token: accessToken || '', productId, data: { size, color } });
            toast.success('Thêm vào giỏ hàng thành công');
            await updateCart();
        } catch {
            toast.error('Thêm vào giỏ hàng thất bại');
        }
    }
    return (
        <Button
            type="dashed"
            size="large"
            icon={<ShoppingCartOutlined />}
            className="
        flex-1 
        bg-blue-500 
        hover:bg-blue-600 
        text-white 
        border-blue-500 
        hover:border-blue-600 
        transition-all 
        duration-300 
        shadow-md 
        hover:shadow-lg 
        rounded-lg 
        px-6 
        py-3 
        font-semibold 
        hover:scale-105
      "
            onClick={handleAddToCart}
        >
            Thêm vào giỏ hàng
        </Button>
    );
}

export default ButtonAddToCart;
