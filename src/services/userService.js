import requestApi from "../utils/requestApi";

export const editProfileService = async(username,userEdit,token,avatar) => {
 console.log(avatar)
  try {
    const respone = await requestApi({
      method: "patch",
      url: `user`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, PATCH, OPTIONS' 
      },
      data:{...userEdit,avatar:avatar}
    });
    return respone.data;
  } catch (error) {
    throw error;
  }
};

export const uploadAvatarService = (idUser,formData) => {
  return requestApi({
    method: "put",
    url: `user/upload-avatar/${idUser}`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
    },
    data:formData
  });
};


export const getInforUserService = () => {
  const username= JSON.parse(localStorage.getItem("currentUserInfor")).currentUser.userName;
  return requestApi({
    method: "get",
    url: `user/${username}`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("currentUserInfor")).accessToken,
    },
  });
};
