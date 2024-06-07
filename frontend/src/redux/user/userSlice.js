import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    //reducers can change the state 
    reducers:{
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        SignInFailure: (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {signInStart, signInSuccess,SignInFailure} = userSlice.actions;
export default userSlice.reducer;