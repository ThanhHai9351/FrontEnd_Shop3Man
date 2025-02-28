"use client";
import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Pagination, Input, Select } from "antd";
import { Breadcrumb } from "antd";
import { IProduct } from "@/helper/type";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductService from "@/service/product.service";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatPrice } from "@/helper/format";

const { Option } = Select;

const Page = () => {
    const router = useRouter();
    const [dataProduct, setDataProduct] = useState<IProduct[]>([]);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
        const fetchData = async () => {
            const response = await ProductService.getAll({
                page,
                limit: 6,
                search: searchText,
                sortDir: sortOrder,
                priceFrom: priceRange[0],
                priceTo: priceRange[1],
            });
            setDataProduct(response.data.data);
            setTotal(response.data.total);
        };
        fetchData();
    }, [page, searchText, sortOrder, priceRange]);

    const handlePageChange = (page: number) => {
        setPage(page - 1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSortChange = (value: string) => {
        setSortOrder(value);
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        setPriceRange([min, max]);
    };

    return (
        <Layout className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="p-8">
                <div className="mb-8" data-aos="fade-down">
                    <h2 className="text-2xl font-bold text-gray-700">Product</h2>
                </div>

                <Breadcrumb
                    className="mb-8"
                    items={[{ title: "Home", className: "cursor-pointer hover:underline", onClick: () => router.push('/') }, { title: "Products" }]}
                    data-aos="fade-right"
                    data-aos-delay="100"
                />

                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={6} className="bg-white p-4 rounded-lg shadow-md" data-aos="fade-right" data-aos-delay="200">
                        <div className="mb-4">
                            <h6 className="mb-2 text-gray-700">Sort by price</h6>
                            <Select
                                defaultValue="asc"
                                style={{ width: "100%" }}
                                onChange={handleSortChange}
                            >
                                <Option value="asc">Sort by price: Low to High</Option>
                                <Option value="desc">Sort by price: High to Low</Option>
                            </Select>
                        </div>
                        <div className="mb-4">
                            <h6 className="mb-2 text-gray-700">Search by name</h6>
                            <Input
                                placeholder="Search by name"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="mb-4">
                            <h6 className="mb-2 text-gray-700">Price Range</h6>
                            <div className="flex justify-center items-center gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min price"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        handlePriceRangeChange(
                                            Number(e.target.value),
                                            priceRange[1]
                                        )
                                    }
                                />
                                <span className="text-gray-700">-</span>
                                <Input
                                    type="number"
                                    placeholder="Max price"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        handlePriceRangeChange(
                                            priceRange[0],
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </Col>

                    <Col xs={24} sm={18}>
                        <Row gutter={[24, 24]}>
                            {dataProduct.map((product, index) => (
                                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        onClick={() => router.push(`/product/${product.slug}`)}
                                        hoverable
                                        cover={
                                            <div className="p-4">
                                                <Image
                                                    src={
                                                        product?.imageUrl ||
                                                        "/no-image.png"
                                                    }
                                                    alt={product.name}
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
                                        <Card.Meta
                                            title={product.name}
                                            description={`${formatPrice(product.price)}`}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {dataProduct.length === 0 ? (
                            <div className="text-center text-gray-700" data-aos="fade-up">No products found</div>
                        ) : (
                            <Pagination
                                className="mt-8 text-center"
                                current={page + 1}
                                pageSize={6}
                                total={total}
                                onChange={handlePageChange}
                                data-aos="fade-up"
                                data-aos-delay="200"
                            />
                        )}
                    </Col>
                </Row>
            </main>
        </Layout>
    );
};

export default Page;
