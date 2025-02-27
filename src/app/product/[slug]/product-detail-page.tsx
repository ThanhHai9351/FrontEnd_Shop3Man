"use client";
import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, Breadcrumb } from 'antd';
import Image from 'next/image';
import ProductService from '@/service/product.service';
import { IProduct } from '@/helper/type';
import ProductSelector from '@/app/product/[slug]/product-selector';
import { useAppContext } from '@/app/app-provider';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductDetailPage = ({ slug }: { slug: string }) => {
    const [product, setProduct] = useState<null | IProduct>(null);
    const { accessToken } = useAppContext();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });

        const fetchProduct = async () => {
            const res = await ProductService.getDetailProduct({ slug, token: accessToken || '' });
            setProduct(res.data);
        };
        fetchProduct();
    }, [slug]);

    return (
        <Layout className="min-h-screen p-8 bg-gray-50">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-700">{product?.name || ''}</h2>
            </div>

            <Breadcrumb className='mb-8' items={[{ title: 'Home', href: '/' }, { title: 'Product', href: '/product' }, { title: product?.name || '' }]} />
            <Row gutter={[32, 32]} className="max-w-7xl mx-auto">
                <Col xs={24} md={12} data-aos="fade-right">
                    <div className="relative aspect-square w-full shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                        <Image
                            src={product?.imageUrl || 'https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg'}
                            alt={product?.name || ''}
                            sizes='full'
                            fill
                            className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <Row gutter={[16, 16]} className="mt-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Col key={index} span={6} className='hover:cursor-pointer'>
                                <div className="relative aspect-square cursor-pointer shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <Image src={product?.imageUrl || 'https://upload-aws-cls.s3.us-east-2.amazonaws.com/aothun.jpg'} alt={product?.name || ''} fill sizes='full' className="object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xs={24} md={12} data-aos="fade-left" data-aos-delay="200">

                    <div className="bg-white p-8 rounded-xl shadow-lg ">
                        <h1 className="text-4xl font-bold mb-4 text-gray-800 border-b pb-4">{product?.name}</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed">{product?.description || 'Không có mô tả'}</p>

                        {product?.items?.length ? (
                            <div data-aos="fade-up" data-aos-delay="200">
                                <ProductSelector product={product} />
                            </div>
                        ) : (
                            <h3 data-aos="fade-up" data-aos-delay="200" className='scroll-m-20 text-xl font-semibold tracking-tight mt-1 mb-2 p-4 bg-red-600 text-white rounded-lg text-center shadow-md'>
                                Sold Out!
                            </h3>
                        )}
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default ProductDetailPage;
