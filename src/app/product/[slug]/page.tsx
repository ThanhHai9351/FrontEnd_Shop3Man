import ProductDetailPage from '@/app/product/[slug]/product-detail-page';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    return {
        title: slug,
        description: slug,
    };
}


const Page = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await Promise.resolve(params);
    return (
        <ProductDetailPage slug={slug} />
    );
}

export default Page;
