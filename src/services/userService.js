import requestApi from "../utils/requestApi";

export const editProfileService = (username,userEdit,token) => {
  return requestApi({
    method: "patch",
    url: `user/${username}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data:userEdit
  });
};

export const uploadAvatarService = (idUser,formData) => {
  return requestApi({
    method: "put",
    url: `user/upload-avatar/${idUser}`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
    data:formData
  });
};


export const getInforUserService = () => {
  return requestApi({
    method: "get",
    url: `user/get_infor`,
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  
  });
};
