"use client"
import { useAppContext } from '@/app/app-provider';
import VnpayService from '@/service/vnpay.service';
import { Button, Result, Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CartService from '@/service/cart.service';

const Page = () => {
    const [state, setState] = useState("loading");
    const router = useRouter();
    const searchParams = useSearchParams();
    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_CardType = searchParams.get('vnp_CardType');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_PayDate = searchParams.get('vnp_PayDate');
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TmnCode = searchParams.get('vnp_TmnCode');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_SecureHash = searchParams.get('vnp_SecureHash');
    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');
    const { accessToken } = useAppContext();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
        verify();
    }, [])

    const verify = async () => {
        try {
            const response = await VnpayService.verifyPayment({
                token: accessToken || "", data: {
                    vnp_Amount: Number(vnp_Amount),
                    vnp_BankCode: vnp_BankCode || "",
                    vnp_CardType: vnp_CardType || "",
                    vnp_OrderInfo: vnp_OrderInfo || "",
                    vnp_PayDate: vnp_PayDate || "",
                    vnp_ResponseCode: vnp_ResponseCode || "",
                    vnp_TmnCode: vnp_TmnCode || "",
                    vnp_TransactionNo: vnp_TransactionNo || "",
                    vnp_TransactionStatus: vnp_TransactionStatus || "",
                    vnp_TxnRef: vnp_TxnRef || "",
                    vnp_SecureHash: vnp_SecureHash || "",
                    vnp_BankTranNo: vnp_BankTranNo || "",
                }
            })
            if (response.RspCode === "00") {
                setState("success");
                await CartService.removeAll({ token: accessToken || "" });
            } else {
                setState("error");
            }
        } catch {
            setState("error");
        }
    }

    const handleBackToCheckout = () => {
        router.push('/checkout');
    }

    const handleBackToOrders = () => {
        router.push('/order');
    }

    if (state === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center" data-aos="fade-up">
                <Spin size="large" tip="Processing payment..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            {state === "success" && (
                <div data-aos="zoom-in">
                    <Result
                        status="success"
                        title="Payment Successful!"
                        subTitle={`Order ID: ${vnp_TxnRef}`}
                        extra={[
                            <Button type="primary" key="orders" onClick={handleBackToOrders}>
                                View Orders
                            </Button>
                        ]}
                    />
                </div>
            )}
            {state === "error" && (
                <div data-aos="zoom-in">
                    <Result
                        status="error"
                        title="Payment Failed"
                        subTitle="Sorry, there was an error processing your payment."
                        extra={[
                            <Button type="primary" key="orders" onClick={handleBackToCheckout}>
                                Back to Checkout
                            </Button>
                        ]}
                    />
                </div>
            )}
        </div>
    );
}

export default Page;
