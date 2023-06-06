import requestApi from "../utils/requestApi";

export const getPaymentService = async (totalAmount, orderId) => {
    try {
      const respone = await requestApi({
        method: "get",
        url: "payment",
        params:{totalAmount:totalAmount, orderId: orderId},
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
        },
      }).then(data => {
        return data
      }).catch(error => {
        console.log(error);
      })
      return respone;
    } catch (error) {
      return error;
    }
  };

  export const sendEmailPaymentSuccessService = async (dataSignup) => {
    try {
      return requestApi({
        method: "post",
        url: "email/payment-success",
        data: {
          "email":`${dataSignup.email}`,
          "subject":"Successful payment!!",
          "username":`${dataSignup.name}`,
        },
        
      });
    } catch (error) {
      throw error;
    }
  };