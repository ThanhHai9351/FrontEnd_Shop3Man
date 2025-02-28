"use client";
import { Input, List, Spin } from "antd";
import React, { useState, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import ProductService from "@/service/product.service";
import { IProduct } from "@/helper/type";
import Link from "next/link";
import Image from "next/image";
import { debounce } from 'lodash';

const TextBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(
        debounce(async (value: string) => {
            if (!value.trim()) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const response = await ProductService.getAll({ search: value, limit: 6 });
                setSearchResults(response.data.data || []);
            } catch (error) {
                console.error("Search error:", error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    return (
        <div className="relative w-full">
            <Input
                placeholder="What are you looking for..."
                prefix={<SearchOutlined className="text-gray-600" />}
                className="w-40 sm:w-64 transition-all duration-300 ease-in-out focus:w-48 sm:focus:w-72"
                value={searchTerm}
                onChange={onChange}
            />

            {searchTerm && (
                <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">
                    {loading ? (
                        <div className="p-4 flex justify-center">
                            <Spin />
                        </div>
                    ) : (
                        <List
                            dataSource={searchResults}
                            renderItem={(item) => (
                                <List.Item key={item._id} className="hover:bg-gray-100 transition">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        className="flex items-center gap-3 w-full"
                                    >
                                        <Image
                                            src={item.imageUrl || '/no-image.png'}
                                            alt={item.name || ''}
                                            className="w-10 h-10 object-cover rounded"
                                            width={40}
                                            height={40}
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                </List.Item>
                            )}
                            locale={{ emptyText: 'No results found' }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default TextBar;
