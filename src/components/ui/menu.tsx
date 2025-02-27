"use client"
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import CategoryService from '@/service/category.service';
import { ICategory } from '@/helper/type';
import { useRouter } from 'next/navigation';

const MenuBarShop = () => {
    const [dataCategory, setDataCategory] = useState<ICategory[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CategoryService.getAll({});
                setDataCategory(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Menu
            mode="horizontal"
            className="px-4 text-gray-700 font-semibold"
            items={dataCategory.map((item: ICategory) => ({
                key: item._id,
                label: item.name,
                onClick: () => {
                    router.push(`/category/${item.slug}`);
                }
            }))}
        />
    );
}

export default MenuBarShop;
