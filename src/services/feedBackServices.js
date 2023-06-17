import requestApi from "../utils/requestApi";

export const getProductDetailFeedBackService = async (id) => {
  try {
    const respone = requestApi({
      method: "get",
      url: `product/${id}/feedback`,
    });
    return respone;
  } catch (error) {
    return error;
  }
};

export const postFeedBackService = async (id, dataFeedBack) => {
    try {
        const respone = await requestApi({
            method: "post", 
            url: `product/${id}/feedback`, 
            data: {
                commentText: `${dataFeedBack.comment}`, 
                rating: `${dataFeedBack.rating}`,
            },
            headers: {
              Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
        return respone
    } catch (error) {
        return error
    }
}