import requestApi from "../utils/requestApi";

export const signupServices = async (dataSignup) => {
  try {
    return requestApi({
      method: "post",
      url: "user",
      data: {
        userName: `${dataSignup.name}`,
        email: `${dataSignup.email}`,
        password: `${dataSignup.password}`,
        phoneNumber: `${dataSignup.phone}`
      },
      
    });
  } catch (error) {
    throw error;
  }
};

export const sendEmailSignUpSuccessService = async (dataSignup) => {
  try {
    return requestApi({
      method: "post",
      url: "email/sign-up-success",
      data: {
        "email":`${dataSignup.email}`,
        "subject":"Sign up success!!",
        "username":`${dataSignup.name}`,
      },
      
    });
  } catch (error) {
    throw error;
  }
};

export const sendOTPSignUpService = async (dataSignup,otp) => {
  try {
    return requestApi({
      method: "post",
      url: "email/send-otp",
      data: {
        "email":`${dataSignup.email}`,
        "subject":"Account Verification",
        "username":`${dataSignup.name}`,
        "msgBody": `${otp}`
      },
      
    });
  } catch (error) {
    throw error;
  }
};
