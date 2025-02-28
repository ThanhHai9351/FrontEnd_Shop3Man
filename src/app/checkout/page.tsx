import CheckoutPage from './checkout-page';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Thanh toán',
    description: 'Thanh toán',
};

const Page = () => {
    return (
        <CheckoutPage />
    );
}

export default Page;    
