import requestApi from "../utils/requestApi";


const currentUserInfor = JSON.parse(localStorage.getItem("currentUserInfor"));
export const getAllProductService = async () => {
  try {
    const respone = await requestApi({ 
      method: "get",
      url: "product",
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
      "image": `${formData.productName}`,
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

export const changeStatusProductService = (idProduct,status_number) => {
  // return requestApi({
  //   url: `product/change_status/${idProduct}`,
  //   method: "put",
  //   data: {status_number},
  //   headers: {
  //     Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
  //   },
  // });
};
