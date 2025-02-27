import apiRequest from "./api-request";

const getAll = ({
  page,
  limit,
  search,
  sortDir,
  priceFrom,
  priceTo,
  categorySlug,
  token,
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortDir?: string;
  priceFrom?: number;
  priceTo?: number;
  categorySlug?: string;
  token?: string;
}) => {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit.toString());
  if (page) params.set("page", page.toString());
  if (search) params.set("search", search);
  if (sortDir) params.set("sortDir", sortDir);
  if (priceFrom) params.set("priceFrom", priceFrom.toString());
  if (priceTo) params.set("priceTo", priceTo.toString());
  if (categorySlug) params.set("categorySlug", categorySlug);
  return apiRequest(`/product?${params.toString()}`, "GET", token);
};

const getDetailProduct = ({ slug, token }: { slug: string, token: string }) =>
  apiRequest(`/product/${slug}`, "GET", token);

const ProductService = { getAll, getDetailProduct };

export default ProductService;
