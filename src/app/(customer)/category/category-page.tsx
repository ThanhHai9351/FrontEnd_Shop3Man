"use client";
import { Layout, Row, Col, Card, Pagination } from 'antd';
import Image from 'next/image';
import { Breadcrumb } from "antd";
import { useState, useEffect } from 'react';
import CategoryService from '@/service/category.service';
import { ICategory } from '@/helper/type';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';


const CategoryPage = () => {
    const router = useRouter();
    const [dataCategory, setDataCategory] = useState<ICategory[]>([]);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
        const fetchData = async () => {
            const response = await CategoryService.getAll({ page, limit: 6 });
            setDataCategory(response.data.data)
            setTotal(response.data.total);
        };
        fetchData();
    }, [page]);

    const handlePageChange = (page: number) => {
        setPage(page - 1);
    };

    return (
        <Layout className="min-h-screen">
            {/* Main Content */}
            <main className="p-8">
                <div className="mb-8" data-aos="fade-down">
                    <h2 className="text-2xl font-bold text-gray-700">Popular Categories</h2>
                </div>

                <Breadcrumb
                    className='mb-8'
                    items={[{ title: 'Home', className: "cursor-pointer hover:underline", onClick: () => router.push('/') }, { title: 'Category' }]}
                    data-aos="fade-right"
                    data-aos-delay="100"
                />

                <Row gutter={[24, 24]}>
                    {dataCategory.map((category, index) => (
                        <Col key={index} xs={12} sm={8} md={6} lg={4}>
                            <Card
                                onClick={() => router.push(`/category/${category.slug}`)}
                                hoverable
                                cover={
                                    <div className="p-4">
                                        <Image
                                            src={category?.imageUrl || '/no-image.png'}
                                            alt={category.name}
                                            width={200}
                                            height={200}
                                            quality={100}
                                            className="object-contain"
                                        />
                                    </div>
                                }
                                className="text-center shadow-lg"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                data-aos-duration="800"
                            >
                                <Card.Meta title={category.name} />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Pagination
                    className="mt-8 text-center"
                    current={page + 1}
                    pageSize={6}
                    total={total}
                    onChange={handlePageChange}
                    data-aos="fade-up"
                    data-aos-delay="200"
                />
            </main>
        </Layout>
    );
}

export default CategoryPage;
