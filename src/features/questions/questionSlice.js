import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {fetchAllQuestions} from './questionAPI'
const initialState = {
    status:'idle',
    questions: [],
    error:null
}

export const fetchAllQuestionsAsync = createAsyncThunk(
    'question/fetchAllQuestions', 
    async () => {
        const response = await fetchAllQuestions();
        return response.results
    }
)

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchAllQuestionsAsync.pending, (state, action) => {
                state.status='loading'
        })
            .addCase(fetchAllQuestionsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = null
                state.questions = action.payload;
        })
            .addCase(fetchAllQuestionsAsync.rejected, (state, action)=> {
                state.status = 'idle'
                state.error = action.error;
        })
    }
})


export const selectAllQuestions = (state) => state.question?.questions;

export const { } = questionSlice.actions;

export default questionSlice.reducer;