"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import CartService from '@/service/cart.service';
import { ICart } from '@/helper/type';
import { useAppContext } from '@/app/app-provider';

const CartContext = createContext<{
    cartItems: ICart[];
    updateCart: () => Promise<void>;
}>({
    cartItems: [],
    updateCart: async () => { }
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<ICart[]>([]);
    const { accessToken } = useAppContext();
    useEffect(() => {
        if (accessToken) {
            fetchCart();
        }
    }, [accessToken]);

    const fetchCart = async () => {
        const res = await CartService.getAll({ token: accessToken || '' });
        setCartItems(res.data);
    };

    const updateCart = async () => {
        await fetchCart();
    };

    return (
        <CartContext.Provider value={{ cartItems, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
