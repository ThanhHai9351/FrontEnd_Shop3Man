import { useAppContext } from '@/app/app-provider';
import { IAddress } from '@/helper/type';
import { Card, List } from 'antd';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState, useEffect } from 'react';
import UserAddressService from '@/service/user-address.service';
import DialogCreateAddress from '@/app/profile/dialog-create-address';
import ButtonDeleteAddress from '@/app/profile/button-delete-address';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddressSelector = () => {
    const { accessToken } = useAppContext();
    const [addresses, setAddresses] = useState<IAddress[]>([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [accessToken]);

    const fetchAddresses = async () => {
        const res = await UserAddressService.getAll({ token: accessToken || "" });
        setAddresses(res.data);
    };
    return (
        <Card data-aos="fade-up">
            <div className="flex justify-between mb-4" data-aos="fade-right" data-aos-delay="200">
                <Title level={4}>My Addresses</Title>
                <DialogCreateAddress fetchAddresses={fetchAddresses} />
            </div>
            <List
                itemLayout="horizontal"
                dataSource={addresses}
                renderItem={(item: IAddress, index) => (
                    <List.Item
                        data-aos="fade-up"
                        data-aos-delay={300 + (index * 100)}
                        actions={[
                            <Button key="edit">Edit</Button>,
                            <ButtonDeleteAddress key="delete" id={item._id} fetchAddresses={fetchAddresses} />
                        ]}
                    >
                        <List.Item.Meta
                            title={item?.city}
                            description={`${item?.city}, ${item?.district}, ${item?.street}`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default AddressSelector;
