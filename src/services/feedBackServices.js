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
        // const respone = await requestApi({
        //     method: "post", 
        //     url: "feedback", 
        //     data: {
        //         product_id: `${dataFeedBack.id}`,
        //         comment_text: `${dataFeedBack.comment}`, 
        //         rating: `${dataFeedBack.rating}`,
        //     },
        //     headers: {
        //       Authorization: "Bearer " + `${dataFeedBack.accessToken}`,
        //     },
        // })
        // return respone
    } catch (error) {
        return error
    }
}