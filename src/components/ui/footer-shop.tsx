import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import Logo from '@/components/logo';

const FooterShop = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Logo width={100} className='text-white' />
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h4 className="text-lg font-bold mb-4">About Us</h4>
                        <p>We are a leading fashion retailer offering the latest trends in clothing and accessories for everyone.</p>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h4 className="text-lg font-bold mb-4">Customer Service</h4>
                        <ul>
                            <li className='p-1'><a href="/contact" className="text-white hover:underline">Contact Us</a></li>
                            <li className='p-1'><a href="/returns" className="text-white hover:underline">Returns</a></li>
                            <li className='p-1'><a href="/shipping" className="text-white hover:underline">Shipping</a></li>
                            <li className='p-1'><a href="/faqs" className="text-white hover:underline">FAQs</a></li>
                        </ul>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="https://www.facebook.com" className="text-white hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                                    <FacebookOutlined className="mr-2" /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com" className="text-white hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                                    <InstagramOutlined className="mr-2" /> Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://www.twitter.com" className="text-white hover:underline flex items-center" target="_blank" rel="noopener noreferrer">
                                    <TwitterOutlined className="mr-2" /> Twitter
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className="text-center mt-8">
                    <p>&copy; {new Date().getFullYear()} Shop3man. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default FooterShop;
