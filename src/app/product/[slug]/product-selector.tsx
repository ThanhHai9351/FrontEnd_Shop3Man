"use client"

import { Button, Typography, Space, Card } from 'antd';
import { formatPrice } from "@/helper/format"
import { IProduct } from "@/helper/type"
import React, { useEffect, useState, type FC } from "react"
import ButtonWhistlist from '@/app/product/[slug]/button-whistlist';
import ButtonAddToCart from '@/app/product/[slug]/button-addToCart';

const { Text, Paragraph } = Typography;

interface Props {
  product: IProduct
}

const ProductSelector: FC<Props> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.items[0]?._id)
  const [selectedColor, setSelectedColor] = useState(product.items[0]?.items[0]?.color)

  useEffect(() => {
    const sizeIndex = product.items.findIndex((p) => p._id === selectedSize)
    const newColor = product.items[sizeIndex]?.items[0]?.color
    setSelectedColor(newColor)
  }, [selectedSize])

  const sizeIndex = product.items.findIndex((p) => p._id === selectedSize)
  const colorIndex = product.items[sizeIndex]?.items.findIndex((s) => s.color === selectedColor)
  const variant = product.items[sizeIndex]?.items[colorIndex]

  return (
    <Card className="shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
      <div className="mb-6">
        <Typography.Title level={2} style={{ color: 'red' }} className=" m-0 text-3xl font-bold">
          {variant ? formatPrice(variant.price) : "N/A"}
        </Typography.Title>
        <Text className={!product?.items.length ? "text-red-500" : "text-gray-500"}>
          {product.items.length > 0 ? "Tax included." : "Sold out."}
        </Text>
      </div>

      <Paragraph className="text-gray-600 mb-6">
        {product.description}
      </Paragraph>

      <Space direction="vertical" size="large" className="w-full mb-6">
        <div>
          <Text className="font-semibold mb-2 block">Size:</Text>
          <Space wrap>
            {product.items.map((item) => (
              <Button
                onClick={() => setSelectedSize(item._id)}
                type={selectedSize === item._id ? "primary" : "default"}
                key={item._id}
                className={`hover:scale-105 transition-transform duration-200 ${selectedSize === item._id ? 'shadow-md' : ''
                  }`}
              >
                {item._id}
              </Button>
            ))}
          </Space>
        </div>

        <div>
          <Text className="font-semibold mb-2 block">Color:</Text>
          <Space wrap>
            {sizeIndex !== -1 &&
              product.items[sizeIndex]?.items.map((item) => (
                <Button
                  onClick={() => setSelectedColor(item.color)}
                  type={selectedColor === item.color ? "primary" : "default"}
                  key={item.color}
                  className={`hover:scale-105 transition-transform duration-200 ${selectedColor === item.color ? 'shadow-md' : ''
                    }`}
                >
                  {item.color}
                </Button>
              ))}
          </Space>
        </div>
      </Space>

      <Space className="w-full gap-4">
        <ButtonAddToCart size={selectedSize} color={selectedColor} productId={product._id} />
        <ButtonWhistlist product={product} />
      </Space>
    </Card>
  )
}

export default ProductSelector
