import requestApi from "../utils/requestApi";


export const getAllProductService = async () => {
  try {
    const respone = await requestApi({ 
      method: "get",
      url: "product/findAll",
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const trendingProductByPeriodTime = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "product/trending-product",
      params: { startDate: start, endDate: end },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllProductUserService = async (currentPage,filterValue, searchValue,sortValue) => {
  try {
    let orderValue ="";
    
    sortValue !== "" ? orderValue = "price" : orderValue = "";
    const respone = await requestApi({ 
      method: "get",
      url: "product",
      params:{page:currentPage,size:12,filter:filterValue,search:searchValue, order: orderValue, dir: sortValue}
    });
    return respone.data;
  } catch (error) {
    return error;
  }
};

export const getDetailService = async (id) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: `product/${id}`,
    });
    return respone;
  } catch (error) {
    return error; 
  }
};

export const addProductService = (formData) => {
  console.log(formData.productName);
  return requestApi({
    url: "product",
    method: "post",
    data: {
      "image": `${formData.image}`,
      productName: `${formData.productName}`,
      price: `${formData.price}`,
      description: `${formData.description}`,
      category: {categoryId:`${formData.categoryId}`},
      inventoryQuantity:`${formData.inventoryQuantity}`
    },
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
};

export const editProductService = (formData, id) => {
  return requestApi({
    url: `product/${id}`,
    method: "patch",
    data: {
      "image": `${formData.image}`,
      productName: `${formData.productName}`,
      price: `${formData.price}`,
      description: `${formData.description}`,
      category: {categoryId:`${formData.categoryId}`},
      inventoryQuantity:`${formData.inventoryQuantity}`
    },
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
    },
  });
};
