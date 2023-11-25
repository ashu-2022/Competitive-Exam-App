import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.user= action.payload
        }
    },
})

export const selectUserInfo = (state) => state.user.user;
export const {saveUser} = userSlice.actions

export default userSlice.reducer