import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import questionReducer from '../features/questions/questionSlice';
import resultReducer from '../features/result/resultSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        question: questionReducer,
        result:resultReducer
    }
})

export default store