import requestApi from "../utils/requestApi";

export const signupServices = async (dataSignup) => {
  try {
    const respone = await requestApi({
      method: "post",
      url: "user",
      data: {
        user_name: `${dataSignup.name}`,
        email: `${dataSignup.email}`,
        password: `${dataSignup.password}`,
        phone_number: `${dataSignup.phone}`
      },
    });
    return respone;
  } catch (error) {
    return error;
  }
};
