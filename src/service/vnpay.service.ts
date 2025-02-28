import apiRequest from "./api-request";

const createUrl = ({ token, data }: { token?: string, data: {orderId: string, amount: number} }) => {
  return apiRequest(`/vnpay/create_payment_url`, "POST", token, data);
};

const VnpayService = { createUrl };

export default VnpayService;
