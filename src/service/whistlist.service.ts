import apiRequest from "./api-request";

const addWhistlist = ({ productId, token }: { productId: string, token: string }) =>
  apiRequest(`/whistlist`, "POST", token, { productId });

const removeWhistlist = ({ productId, token }: { productId: string, token: string }) =>
  apiRequest(`/whistlist`, "DELETE", token, { productId });

const WhistlistService = { addWhistlist, removeWhistlist };

export default WhistlistService;
