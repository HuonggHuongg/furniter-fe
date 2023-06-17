import requestApi from "../utils/requestApi";

export const getAllCategoryServices = () => {
  return requestApi({
    url: "category",
    method: "get",
  });
};

export const createCategoryServices = (categoryName) => {
  try {
    return requestApi({
      url: "category",
      method: "post",
      data: categoryName,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateCategoryServices = (categoryName,id) => {
  try {
    return requestApi({
      url: `category/${id}`,
      method: "patch",
      data: categoryName,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
      },
    });
  } catch (error) {
    throw error;
  }
};

export const CategoryServices = (categoryName) => {
  try {
    return requestApi({
      url: "category",
      method: "patch",
      data: {
        "categoryName": categoryName
      }
    });
  } catch (error) {
    throw error;
  }
};


