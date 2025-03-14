import { IProduct } from '@/helper/type';
import { HeartOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useAppContext } from '@/app/app-provider';
import WhistlistService from '@/service/whistlist.service';
import { toast } from 'sonner';

const ButtonWhistlist = ({ product }: { product: IProduct }) => {
    const [isWhistlist, setIsWhistlist] = useState<boolean>(product.isWhistlisted);
    const { accessToken } = useAppContext();

    const handleClick = async () => {
        try {
            if (isWhistlist) {
                await WhistlistService.removeWhistlist({ productId: product._id, token: accessToken || '' });
            } else {
                await WhistlistService.addWhistlist({ productId: product._id, token: accessToken || '' });
            }
            setIsWhistlist(!isWhistlist);
            toast.success(isWhistlist ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
        } catch {
            toast.error(isWhistlist ? 'Lỗi khi xóa khỏi danh sách yêu thích' : 'Lỗi khi thêm vào danh sách yêu thích');
        }
    };

    return (
        <Button
            type="default"
            size="large"
            onClick={handleClick}
            className={`flex items-center justify-center rounded-full px-6 py-3 font-semibold 
                transition-all duration-300 shadow-md hover:shadow-lg
                ${isWhistlist ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
            `}
            icon={<HeartOutlined className={`text-lg ${isWhistlist ? 'text-white' : 'text-gray-700'}`} />}
        >
            {isWhistlist ? 'Đã yêu thích' : 'Yêu thích'}
        </Button>
    );
};

export default ButtonWhistlist;
