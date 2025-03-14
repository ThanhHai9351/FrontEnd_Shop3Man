"use client";
import { Avatar, Popover } from "antd";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import AccountService from "@/service/account.service";
import { IAccount } from "@/helper/type";
import { useAppContext } from "@/app/app-provider";
import { useCartContext } from "@/app/cart-provider";
import {
    BellOutlined,
    LogoutOutlined,
    UserAddOutlined,
    UserOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";

const AvatarBar = () => {
    const { accessToken, setAccessToken } = useAppContext();
    const [account, setAccount] = useState<IAccount | null>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const { updateCart } = useCartContext();
    useEffect(() => {
        const fetchData = async () => {
            const res = await AccountService.getProfile(accessToken || "");
            Cookies.set("userId", res.data._id);
            Cookies.set("user", JSON.stringify(res.data));
            setAccount(res.data);
            setIsLogin(true);
        };
        fetchData();
    }, [isLogin, accessToken]);

    const handleLogout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userId");
        Cookies.remove("user");
        setAccessToken("");
        setIsLogin(false);
        setAccount(null);
        updateCart();
    };

    const contentVerify = (
        <div className="p-3 ">
            <Link
                href="/profile"
                className="hover:cursor-pointer block mb-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            >
                <UserOutlined className="mr-2 text-indigo-500" /> Tài khoản
            </Link>
            <Link
                href="/notifications"
                className="hover:cursor-pointer block mb-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            >
                <BellOutlined className="mr-2 text-indigo-500" /> Thông báo
            </Link>
            <Link
                href="/order"
                className="hover:cursor-pointer block mb-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            >
                <ShoppingCartOutlined className="mr-2 text-indigo-500" /> Đơn hàng
            </Link>
            <Link
                href="/whistlist"
                className="hover:cursor-pointer block mb-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            >
                <HeartOutlined className="mr-2 text-indigo-500" /> Danh sách yêu thích
            </Link>
            <Link
                href="/social"
                className="hover:cursor-pointer block mb-3 text-gray-700 hover:text-gray-900 font-semibold flex items-center"
            >
                <MessageOutlined className="mr-2 text-indigo-500" /> Chế độ mạng xã hội
            </Link>
            <Divider />
            <p
                onClick={handleLogout}
                className="hover:cursor-pointer text-red-600 hover:text-red-700 font-semibold flex items-center"
            >
                <LogoutOutlined className="mr-2 text-red-600" /> Đăng xuất
            </p>
        </div>

    );

    const contentNoVerify = (
        <>
            <hr />
            <div className="p-3">
                <Link
                    href="/login"
                    className="hover:cursor-pointer block mb-2 text-blue-500 hover:text-blue-700 font-semibold"
                >
                    <UserOutlined className="mr-2" /> Đăng nhập
                </Link>
                <Link
                    href="/register"
                    className="hover:cursor-pointer text-red-500 hover:text-red-700 block font-semibold"
                >
                    <UserAddOutlined className="mr-2" /> Đăng ký
                </Link>
            </div>
        </>
    );

    return (
        <Popover
            className="hover:cursor-pointer"
            placement="bottom"
            content={account ? contentVerify : contentNoVerify}
            title={
                account
                    ? "Xin chào: " + account.firstName + " " + account.lastName
                    : "Welcome to Shop3Man"
            }
        >
            <Avatar
                src={
                    account?.avatarUrl
                        ? account?.avatarUrl
                        : "https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg"
                }
                size={32}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
        </Popover>
    );
};

export default AvatarBar;
