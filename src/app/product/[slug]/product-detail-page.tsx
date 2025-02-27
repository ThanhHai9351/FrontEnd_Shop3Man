import React from 'react';

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
    return (
        <div>
            <h1>Product Detail Page</h1>
            <p>{params.slug}</p>
        </div>
    );
}

export default ProductDetailPage;
