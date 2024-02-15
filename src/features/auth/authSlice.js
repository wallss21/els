import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Store as InfoStore } from "react-notifications-component";

// import  jwt from "jsonwebtoken";

// const root_url = "http://127.0.0.1:8000/apiv1/accounts/";
const root_url = "https://walse.pythonanywhere.com/apiv1/accounts/";

const createAlert = (data) => {
  return InfoStore.addNotification({
    title: data.title,
    message: data.message,
    type: data.type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 5000,
    },
  });
};

const initialState = {
  isLoading: null,
  error: null,
  authenticated: null,
  userDetails: null,
  userMessage: "",
  userMessageType: "",
};

// promise handler

export const readLocalStorage = createAsyncThunk(
  "auth/readLocalStorage",
  async (userToken, { extra }) =>
    new Promise((resolve, reject) => {
      if (localStorage.getItem("userToken" !== null)) {
        return resolve(localStorage.removeItem("userToken"));
      }
      return reject(null);
    })
);

// async fucntion
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      let res = await axios.post(`${root_url}signin/`, userData);

      if (res.status === 200) {
        return res.data;
      }

      return rejectWithValue({ message: "login failed" });
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error.response
          ? error.response.data.email[0]
          : "Invalid Username and Password.",
        type: "error",
      });
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  if (localStorage.getItem("userToken")) localStorage.removeItem("userToken");
  return true;
});

export const checkIfUserLogin = createAsyncThunk(
  "auth/checkIfUserLogin",
  async (userdata, { rejectWithValue }) => {
    const userToken = localStorage.getItem("userToken")
      ? localStorage.getItem("userToken")
      : null;
    if (userToken !== null) {
      return userToken;
    }
    return rejectWithValue({ data: null });
  }
);

// bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
export const register = createAsyncThunk(
  "Auth/register",
  async (userData, { extra, rejectWithValue }) => {
    let res;
    try {
      res = await axios.post(`${root_url}create/`, userData);
      if (res.status !== 201) {
        return rejectWithValue({ message: "something went wrong" });
      }
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message:
          error.response && error.response.data.email
            ? error.response.data.email[0]
            : error.message,
      });
    }
  }
);

export const recoverAccount = createAsyncThunk(
  "auth/recoverAccount",
  async (userData, { extra, rejectWithValue }) => {
    try {
      let res = await axios.post(`${root_url}recovery/`, userData);
      if (res.data.message) {
        return rejectWithValue({
          message: " Account not Found",
        });
      }
      return { message: "An email has been sent to you" };
    } catch (error) {
      rejectWithValue({
        message: "Something went Wrong! Please try again",
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { extra, rejectWithValue }) => {
    if (userData.route.email === "" || userData.route.time === "") return;

    try {
      let res = await axios.post(
        `${root_url}recovery/${userData.route.email}/${userData.route.time}/`,
        { password: userData.password1 }
      );
      console.log(res);
      if (res.status === 200) return { status: "success" };
      return rejectWithValue({ status: res.data.message });
    } catch (error) {
      if (error.response?.data.message)
        return rejectWithValue({ status: error.response.data.message });
      return rejectWithValue({ status: "failed" });
    }
  }
);

// userAuth Slice/reducers/extraReducers
//
export const userSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    clearError: (state, action) => {
      state.userMessage = "";
      state.userMessageType = "";
    },
    showAlert: (state, action) => {
      console.log(action.payload);
      createAlert(action.payload);
    },
  },
  extraReducers: (builder) => {
    //  checking for saved usertoken

    builder.addCase(checkIfUserLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkIfUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload;
      state.authenticated = true;
    });
    builder.addCase(checkIfUserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.authenticated = false;
      state.error = action.error.message;
    });
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = action.payload.access;
      state.authenticated = true;
      localStorage.setItem("userToken", action.payload.access);

      createAlert({
        type: "success",
        message: "Login Successful",
        title: "Authentication",
      });
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.authenticated = false;
      createAlert({
        type: "danger",
        message:
          action.payload && action.payload.message
            ? action.payload.message
            : "Invalid Username and Password",
        title: "Authentication",
      });
    });

    // ******************
    //
    // ******************

    // logout a user
    builder.addCase(logout.pending, (state) => {});
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userDetails = {};
      state.authenticated = false;
    });
    // TODO make sure that logout faliure reject with error message
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // ###########
    // ###########
    // REGISTER
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userMessage = `Welcome ${action.payload.first_name} ${action.payload.last_name} your account was created successfull`;
      state.userMessageType = "success";
      state.new_reg = true;
      createAlert({
        type: "success",
        message: "Registration Successful Please login to continue",
        title: "Authentication",
      });
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.userMessage = action.payload
        ? action.payload.message
        : "Something went Wrong";
      state.userMessageType = "error";
    });
    // recoverAccount
    builder.addCase(recoverAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(recoverAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      createAlert({
        message:
          "An e-mail has been sent to you. Please follow the instr=uction to reaet your password.",
        type: "info",
        title: "password Recovery",
      });
    });
    builder.addCase(recoverAccount.rejected, (state, action) => {
      state.isLoading = false;
      createAlert({
        message: "Please try again Something went wrong",
        type: "danger",
        title: "Password Recovery",
      });
      state.userMessage = state.userMessageType = "error";
    });

    // resetPassword
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      createAlert({
        type: "success",
        title: "Password Reset",
        message: "Password reset succesfull!!",
      });
      // state.userMessageType = action.payload.type;
      state.isLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      createAlert({
        type: "danger",
        title: "Password Reset",
        message: "Link Expired",
      });

      state.isLoading = false;
    });
  },
});

export const { clearError, showAlert } = userSlice.actions;

export default userSlice.reducer;
