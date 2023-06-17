import requestApi from "../utils/requestApi";

export const revenueByPeriodTimeService = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/revenue",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

export const summaryByPeriodTimeService = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/summary",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

export const orderByPeriodTimeService = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/order",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

export const categoryByPeriodTimeService = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/category",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

export const topProductByPeriodTime = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/product",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

// export const trendingProductByPeriodTime = async (start, end) => {
//   try {
//     const respone = await requestApi({
//       method: "get",
//       url: "product/trending-product",
//       params: { startDate: start, endDate: end },
//       headers: {
//         Authorization:
//           "Bearer " +
//           JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Methods":
//           "PUT, POST, GET, DELETE, PATCH, OPTIONS",
//       },
//     });
//     return respone;
//   } catch (error) {
//     return error.response.data;
//   }
// };


export const orderRecentByPeriodTime = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/order-recent",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};

export const topUserByPeriodTime = async (start, end) => {
  try {
    const respone = await requestApi({
      method: "get",
      url: "report/user",
      params: { startDate: start, endDate: end },
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods":
          "PUT, POST, GET, DELETE, PATCH, OPTIONS",
      },
    });
    return respone;
  } catch (error) {
    return error.response.data;
  }
};