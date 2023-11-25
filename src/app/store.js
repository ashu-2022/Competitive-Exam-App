import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import questionReducer from '../features/questions/questionSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        question:questionReducer
    }
})

export default store