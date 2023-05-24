import requestApi from "../utils/requestApi";

export const createOrderService = async (dataCreateOrder) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "order",
      data: {
        fullName: `${dataCreateOrder.name}`,
        receivingAddress: `${dataCreateOrder.address}`,
        phoneNumber: `${dataCreateOrder.number}`,
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

export const addProductToOrderService = async (dataCart, idOrder) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: `/order/${idOrder}/items`,
      data: {
        productIds: dataCart.productIds,
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

export const changeTotalOrderService = (idOrder)=>{
  return requestApi({
    method: "patch",
    url: `order/changeTotal/${idOrder}`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
    },
  });
}

export const getAllOrderAnUserService = async () => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "order",
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

export const getDetailsOrderService = async (id) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: `orderItem/${id}`,
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

export const getAllOrderPendingService = () => {
  return requestApi({
    method: "get",
    url: "order/pending",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
};


export const getAllOrderDeliveredService = () => {
  return requestApi({
    method: "get",
    url: "order/delivered",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
};


export const changeStatusOrderService = (idOrder)=>{
  return requestApi({
    method: "patch",
    url: `order/changeStatus/${idOrder}`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
    },
  });
}

export const changeStatusPaymentService = (idOrder)=>{
  return requestApi({
    method: "patch",
    url: "order/changePaymentStatus",
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
    },
    params:{id:idOrder},
  });
}
