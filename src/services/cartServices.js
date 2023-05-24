import requestApi from "../utils/requestApi";

export const addProductToCartService = async (dataCart, username) => {
  console.log(username);
  try {
    const respone = await requestApi({
      method: "post",
      url: `/cart/${username}/items`,
      data: {
        productId: `${dataCart.id}`,
        quantity: `${dataCart.quantity}`,
      },
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const getAllCartItemService = async () => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "/cartItem/item",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
      },
    });
    return respone;
  } catch (error) {
    return error.response.data
  }
};

export const deleteCartItemService = async (id) => {
    try {
      const respone = await requestApi({
        method: "delete",
        url: `cartItem/${id}`,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
        },
      });
      return respone;
    } catch (error) {
      return error
    }
  };