import React from 'react';
import CategoryDetailPage from './category-detail-page';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    return {
        title: slug,
        description: slug,
    };
}


export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await Promise.resolve(params);
    return <CategoryDetailPage slug={slug} />;
}

