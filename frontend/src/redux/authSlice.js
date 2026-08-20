import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        tokenExpiresAt:null,
    },
    reducers:{
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload
        },
        setTokenExpiresAt:(state, action) => {
            state.tokenExpiresAt = action.payload;
        }
    }
});
export const {setLoading, setUser, setTokenExpiresAt} = authSlice.actions;
export default authSlice.reducer;