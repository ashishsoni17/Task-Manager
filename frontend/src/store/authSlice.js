import {createSlice} from '@reduxjs/toolkit'

//Current user auth status and data
const userState = {
    status : false,
    userData: null 
}

const authSlice = createSlice({
    name : "auth",
    initialState : userState,
    reducers : {
        login : (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null; 
        }
    }
})

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;