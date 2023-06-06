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

export const forgotPasswordService = async (dataForgotPass) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "user/forgot-password",
      data: {
        email: `${dataForgotPass.email}`,
      },
    });
    return respone.data;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordService = async (dataResetPassword,email,token) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "user/reset-password",
      data: {
        email: `${email}`,
        token: `${token}`,
        resetPassword: `${dataResetPassword.password}`,
      },
    });
    return respone.data;
  } catch (error) {
    throw error;
  }
};
