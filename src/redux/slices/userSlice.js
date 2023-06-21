import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, loginServices } from "../../services/loginServices";
import { signupServices } from "../../services/signupService";
import {
  editProfileService,
  getInforUserService,
  uploadAvatarService,
} from "../../services/userService";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    message: "",
    token: "",
    currentUser: {},
    userRoles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginApi.pending, (state) => {
        state.status = "loading";
        state.message = "";
      })
      .addCase(userLoginApi.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.accessToken;
        state.currentUser = action.payload.currentUser;
        state.userRoles = action.payload.userRoles;
        state.message = "Login successfully!";
      })
      .addCase(getUserInfoApi.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(userLoginApi.rejected, (state) => {
        state.status = "idle";
        state.message = "Login fail!";
      })
      .addCase(userSignupApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LogoutApi.fulfilled, (state, action) => {
        state.currentUser = null;
        state.token = null;
        state.userRoles = null;
        state.status = "idle";
        state.message = "";
      });
  },
});

export const LogoutApi = createAsyncThunk("user/userLogout", async () => {
  return {};
});

export const userLoginApi = createAsyncThunk(
  "user/userLogin",
  async (dataLogin) => {
    const responeApi = await loginServices(dataLogin);

    if (responeApi.status === 401) {
      return Promise.reject();
    }

    const responeCurrenUser = {
      accessToken: responeApi.jwt,
      currentUser: responeApi.user,
      userRoles: responeApi.roles,
    };

    localStorage.setItem("currentUserInfor", JSON.stringify(responeCurrenUser));

    return responeCurrenUser;
  }
);

export const userSignupApi = createAsyncThunk(
  "user/userSignup",
  async (dataSignup) => {
    await signupServices(dataSignup);
  }
);

export const editProfileApi = (userId, userEdit, token) => {
  return async (dispatch) => {
    const { data } = await editProfileService(userId, userEdit, token);

    localStorage.setItem("currentUserInfor", JSON.stringify(data));
  };
};

export const uploadAvatarApi = (idUser, formData) => {
  return async (dispatch) => {
    try {
      await uploadAvatarService(idUser, formData);
      const { data } = await getInforUserService();
      localStorage.setItem("currentUserInfor", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserInfoApi = createAsyncThunk(
  "user/getUserInfo", 
  async () => {
    const respone = await getInforUserService();
    console.log(respone);
    return respone.data;
});
