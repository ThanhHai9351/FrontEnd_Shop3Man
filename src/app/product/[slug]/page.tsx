import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: params.slug,
        description: params.slug,
    };
}

const Page = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <h1>Product {params.slug}</h1>
        </div>
    );
}

export default Page;
