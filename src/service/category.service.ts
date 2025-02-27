import apiRequest from "./api-request";

const getAll = ({
  page,
  limit,
  search,
  sortDir,
  token,
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortDir?: string;
  token?: string;
}) =>
  {
    const params = new URLSearchParams();
    if(limit) params.set("limit", limit.toString());
    if(page) params.set("page", page.toString());
    if(search) params.set("search", search);
    if(sortDir) params.set("sortDir", sortDir);
    return apiRequest(
        `/category?${params.toString()}`,
        "GET",
        token
      );
  }


const CategoryService = { getAll };

export default CategoryService;
