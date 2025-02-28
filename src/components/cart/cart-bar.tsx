"use client"
import { ShoppingCartOutlined, } from '@ant-design/icons';
import { Badge, Drawer, Button, Typography } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import CartSelector from '@/components/cart/cart-selector';
import { useCartContext } from '@/app/cart-provider';
import { useRouter } from 'next/navigation';
import CartService from '@/service/cart.service';
import { useAppContext } from '@/app/app-provider';
import { toast } from 'sonner';
const { Text } = Typography;

const CartBar = () => {
    const [open, setOpen] = useState(false);
    const { cartItems, updateCart } = useCartContext();
    const router = useRouter();
    const { accessToken } = useAppContext();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleRemoveAllCart = async () => {
        try {
            await CartService.removeAll({ token: accessToken || '' });
            await updateCart();
        } catch {
            toast.error('Lỗi khi xóa tất cả sản phẩm trong giỏ hàng');
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price), 0);

    return (
        <>
            <Badge count={cartItems.length} className='cursor-pointer' onClick={showDrawer}>
                <ShoppingCartOutlined className="text-lg sm:text-xl transition-transform duration-300 ease-in-out hover:scale-110" />
            </Badge>

            <Drawer
                title="Giỏ hàng"
                placement="right"
                onClose={onClose}
                open={open}
                footer={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <Text strong>Total Amount:</Text>
                            <Text strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</Text>
                        </div>
                        <div className="flex gap-2">
                            <Button type="primary" block onClick={() => router.push("/checkout")} >
                                Checkout
                            </Button>
                            <Button danger onClick={handleRemoveAllCart} >
                                Remove All
                            </Button>
                        </div>
                    </div>
                }
            >
                {cartItems.length === 0 ? (
                    <div className="text-center text-gray-500">Your cart is empty</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex gap-4 border-b pb-4">
                                <Image
                                    src={item.product?.imageUrl || 'https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg'}
                                    alt={item.product?.name || ''}
                                    width={120}
                                    height={120}
                                    className="object-cover"
                                />
                                <div className="flex-1">
                                    <Text strong>{item.product?.name || ''}</Text>
                                    <div className="text-sm text-gray-500">
                                        <div>Color: <span className='text-gray-700'>{item?.color || ''}</span></div>
                                        <div>Size: <span className='text-gray-700'>{item?.size || ''}</span></div>
                                        <div><span className='text-red-600 font-medium'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price || 0)}</span></div>
                                    </div>
                                    <CartSelector itemCart={item} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Drawer>
        </>
    );
}

export default CartBar;
