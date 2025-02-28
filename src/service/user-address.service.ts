import { IAddress } from "@/helper/type";
import apiRequest from "./api-request";

const getAll = ({ token }: { token: string }) =>
  apiRequest(`/user/address`, "GET", token);

const createAddress = ({ token, data }: { token: string, data: Omit<IAddress, "_id" | "userId"> }) =>
  apiRequest(`/user/address`, "POST", token, data);

const deleteAddress = ({ token, id }: { token: string, id: string }) =>
  apiRequest(`/user/address/${id}`, "DELETE", token);

const UserAddressService = { getAll, createAddress, deleteAddress };

export default UserAddressService;
