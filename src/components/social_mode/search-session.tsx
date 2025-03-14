import { Input, List, Avatar, Typography, Spin } from "antd";
import React, { useState, useCallback } from "react";
import AccountService from "@/service/account.service";
import { IAccount } from "@/helper/type";
import { useAppContext } from "@/app/app-provider";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";

const SearchSession = () => {
    const [searchResults, setSearchResults] = useState<IAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const { accessToken } = useAppContext();
    const router = useRouter();
    const handleSearch = useCallback(
        debounce(async (value: string) => {
            if (!value.trim()) {
                setSearchResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await AccountService.getAllAccounts(accessToken, {
                    limit: 10,
                    search: value,
                });
                setSearchResults(Array.isArray(response?.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Error searching accounts:", error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }, 300),
        [accessToken]
    );

    return (
        <div className="space-y-4 p-4">
            <Input.Search
                placeholder="Nhập từ khóa tìm kiếm..."
                enterButton="Tìm"
                size="large"
                onChange={(e) => handleSearch(e.target.value)}
                loading={loading}
            />

            <Spin spinning={loading}>
                <List
                    dataSource={searchResults}
                    locale={{ emptyText: "Không tìm thấy kết quả nào" }}
                    renderItem={(user) => (
                        <List.Item className="cursor-pointer hover:bg-gray-100 transition-colors p-2 rounded-md" onClick={() => router.push(`/social/${user._id}`)}>
                            <List.Item.Meta
                                avatar={<Avatar src={user.avatarUrl || "/no-image.png"} size={48} />}
                                title={<Typography.Text strong>{user.firstName} {user.lastName}</Typography.Text>}
                                description={<Typography.Text type="secondary">{user.email}</Typography.Text>}
                            />
                        </List.Item>
                    )}
                />
            </Spin>
        </div>
    );
};

export default SearchSession;
