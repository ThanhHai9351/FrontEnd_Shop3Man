import React from 'react';
import CategoryDetailPage from './category-detail-page';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: params.slug,
        description: params.slug,
    };
}


const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <CategoryDetailPage slug={params.slug} />
    );
}

export default Page;
