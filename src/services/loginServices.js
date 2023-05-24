import requestApi from "../utils/requestApi";

export const loginServices = async (dataLogin) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "user/login",
      data: {
        userName: `${dataLogin.name}`,
        password: `${dataLogin.password}`,
      },
    });
    return respone.data;
  } catch (error) {
    return error.response;
  }
};

// export const getCurrentUser = async (username,accessToken) => {
//   try {
//     const respone = await requestApi({
//       method: "get", 
//       url: `user/${username}`, 
//       headers: {
//         Authorization: "Bearer " + accessToken,
//       },
//     });
//     return respone
//   } catch (error) {
//     return error
//   }
// }