import { Metadata } from 'next';
import RegisterForm from './register-form';

export const metadata: Metadata = {
    title: "Đăng ký",
    description: "Đăng ký",
};

const Page = () => {
    return (
        <RegisterForm />
    );
}

export default Page;
