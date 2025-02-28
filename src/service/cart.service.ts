import apiRequest from "./api-request";

const getAll = ({ token }: { token?: string }) => {
  return apiRequest(`/cart`, "GET", token);
};

const addToCart = ({ token, productId, data }: { token?: string, productId: string, data:{size:number, color:string} }) => {
  return apiRequest(`/cart/${productId}`, "POST", token, data);
};

const removeToCart = ({ token, productId, data }: { token?: string, productId: string, data:{size:number, color:string} }) => {
    return apiRequest(`/cart/${productId}`, "DELETE", token, data);
  };

const removeAll = ({ token }: { token?: string }) => {
  return apiRequest(`/cart/customer/remove-all`, "DELETE", token);
};

const CartService = { getAll, addToCart, removeToCart, removeAll };

export default CartService;
