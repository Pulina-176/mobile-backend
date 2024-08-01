import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRestaurant: null,
  loading: false,
  error: false,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signUpSuccess: (state, action) => {
      state.currentRestaurant = action.payload;
      state.loading = false;
      state.error = false;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInStart: (state) => {
        state.loading = true;
    },
    signInSuccess: (state, action) => {
        state.currentRestaurant = action.payload;
        state.loading = false;
        state.error = false;
    },
    signInFailure: (state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.currentRestaurant = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRestaurantStart: (state) => {
      state.loading = true;
    },
    deleteRestaurantSuccess: (state) => {
      state.currentRestaurant = null;
      state.loading = false;
      state.error = false;
    },
    deleteRestaurantFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // signOut: (state) => {
    //   state.currentRestaurant = null;
    //   state.loading = false;
    //   state.error = false;
    // },
  },
});

export const { signUpStart, signUpSuccess, signUpFailure,signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFailure,deleteRestaurantStart,deleteRestaurantSuccess,deleteRestaurantFailure } = restaurantSlice.actions;
export default restaurantSlice.reducer;
