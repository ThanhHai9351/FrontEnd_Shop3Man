import apiRequest from "./api-request";

const addWhistlist = ({ productId, token }: { productId: string, token: string }) =>
  apiRequest(`/whistlist`, "POST", token, { productId });

const removeWhistlist = ({ productId, token }: { productId: string, token: string }) =>
  apiRequest(`/whistlist`, "DELETE", token, { productId });

const getWhistlists = ({
  page,
  limit,
  search,
  sortDir,
  priceFrom,
  priceTo,
  token,
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortDir?: string;
  priceFrom?: number;
  priceTo?: number;
  token?: string;
}) => {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit.toString());
  if (page) params.set("page", page.toString());
  if (search) params.set("search", search);
  if (sortDir) params.set("sortDir", sortDir);
  if (priceFrom) params.set("priceFrom", priceFrom.toString());
  if (priceTo) params.set("priceTo", priceTo.toString());
  return apiRequest(`/whistlist?${params.toString()}`, "GET", token);
};

const WhistlistService = { addWhistlist, removeWhistlist,getWhistlists };

export default WhistlistService;
