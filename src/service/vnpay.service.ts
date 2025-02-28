import apiRequest from "./api-request";

const createUrl = ({
  token,
  data,
}: {
  token?: string;
  data: { orderId: string; amount: number };
}) => {
  return apiRequest(`/vnpay/create_payment_url`, "POST", token, data);
};

const verifyPayment = ({
  token,
  data,
}: {
  token?: string;
  data: {
    vnp_Amount: number;
    vnp_BankCode: string;
    vnp_CardType: string;
    vnp_OrderInfo: string;
    vnp_PayDate: string;
    vnp_ResponseCode: string;
    vnp_TmnCode: string;
    vnp_TransactionNo: string;
    vnp_TransactionStatus: string;
    vnp_TxnRef: string;
    vnp_SecureHash: string;
    vnp_BankTranNo: string;
  };
}) => {
  const params = new URLSearchParams();
  if (data.vnp_Amount) params.set("vnp_Amount", data.vnp_Amount.toString());
  if (data.vnp_BankCode) params.set("vnp_BankCode", data.vnp_BankCode);
  if (data.vnp_CardType) params.set("vnp_CardType", data.vnp_CardType);
  if (data.vnp_OrderInfo) params.set("vnp_OrderInfo", data.vnp_OrderInfo);
  if (data.vnp_PayDate) params.set("vnp_PayDate", data.vnp_PayDate);
  if (data.vnp_ResponseCode) params.set("vnp_ResponseCode", data.vnp_ResponseCode);
  if (data.vnp_TmnCode) params.set("vnp_TmnCode", data.vnp_TmnCode);
  if (data.vnp_TransactionNo) params.set("vnp_TransactionNo", data.vnp_TransactionNo);
  if (data.vnp_TransactionStatus) params.set("vnp_TransactionStatus", data.vnp_TransactionStatus);
  if (data.vnp_TxnRef) params.set("vnp_TxnRef", data.vnp_TxnRef);
  if (data.vnp_SecureHash) params.set("vnp_SecureHash", data.vnp_SecureHash);
  if (data.vnp_BankTranNo) params.set("vnp_BankTranNo", data.vnp_BankTranNo);
  return apiRequest(`/vnpay/vnpay_ipn?${params.toString()}`, "GET", token);
};  

const VnpayService = { createUrl, verifyPayment };

export default VnpayService;
