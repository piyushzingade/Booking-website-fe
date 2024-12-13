//**From hosted backend server , user auth tokens are not getting set properly at client side and server side , have to resolve it.
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

// Interface for user data
export interface UserData {
  fullName: string;
  password : string,
  re_enterPassword:string,
  email: string;
  phoneNumber: string;
}

export interface LoginType{
  email : string;
  password : string;
}

// Interface for AuthState
export interface AuthState {
  isLoggedIn: boolean;
  data: UserData | null;
}


// Get initial state from local storage
const storedData = localStorage.getItem('data');
const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', 
  data: storedData && storedData !== "undefined" ? JSON.parse(storedData) : null,
};

// Create account thunk
export const createAccount = createAsyncThunk("auth/createAccount",async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/register", data);
      toast.success(response.data?.message || "Account created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create account");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login thunk
export const login = createAsyncThunk("auth/login",async (data: LoginType, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      toast.success(response.data?.message || "Login successful");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to login");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk("auth/logout",async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success(response.data?.message || "Logout successful");
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to logout");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Update profile thunk
export const updateProfile = createAsyncThunk("auth/updateProfile",async ([id, profileData]: [string, Partial<UserData>], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/user/update/${id}`, profileData);
      toast.success(response.data?.message || "Profile updated successfully");
      return response.data?.user;
    } catch (error: any) {
      // toast.error(error?.response?.data?.message || "Failed to update profile");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get user data thunk
export const getUserData = createAsyncThunk("auth/getUserData",async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/me");
      return response.data?.user;
    } catch (error: any) {
      // toast.error(error?.response?.data?.message || "Failed to fetch user data");
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login fulfilled
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        localStorage.setItem("data", JSON.stringify(action.payload?.user));
        localStorage.setItem("isLoggedIn", 'true');
        state.isLoggedIn = true;
        state.data = action.payload?.user;
      })
      // Logout fulfilled
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = null;
        state.isLoggedIn = false;
      })
      // Fetch user data fulfilled
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<any>) => {
        if (!action.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", 'true');
        state.isLoggedIn = true;
        state.data = action.payload;
      })

      //Update user profile data fullfilled

      .addCase(updateProfile.fulfilled , (state , action : PayloadAction<any>)=>{
        if(!action.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action.payload));
        localStorage.setItem("isLoggedIn", 'true');
        state.isLoggedIn = true;
        state.data = action.payload;
      })
      
  }
});

export default authSlice.reducer;
