import apiRequest from "./api-request";

const createOrder = ({ token, addressId }: { token: string, addressId: string }) =>
  apiRequest(`/order/${addressId}`, "POST", token);

const getAll = ({ page, limit, token }: { page?: number, limit?: number, token: string }) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set('page', page.toString());
  if (limit) queryParams.set('limit', limit.toString());
  return apiRequest(`/order?${queryParams.toString()}`, "GET", token);
};

const OrderService = { createOrder, getAll };

export default OrderService;
