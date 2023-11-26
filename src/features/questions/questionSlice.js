import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllQuestions } from "./questionAPI";
const initialState = {
  status: "idle",
  questions: [],
  error: null,
  submit:false,
  userActivity: {
    answered: 0,
    not_answered: 0,
    not_visited: 0,
    marked: 0,
    answered_marked_review: 0,
  },

};

export const fetchAllQuestionsAsync = createAsyncThunk(
  "question/fetchAllQuestions",
  async () => {
    const response = await fetchAllQuestions();
    return response.results;
  }
);

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    updateQuestionState: (state, action) => {
      const userAnsObj = action.payload;
      state.questions = state.questions.map((item) => {
        if (item.question === userAnsObj.question) {
          let oldObj = { ...item };
          let newObj = { ...item, ...userAnsObj };
          // console.log("oldObj", oldObj);
          // console.log("newObj", newObj);
          if ("userAnswer" in oldObj) {
            if (
              oldObj["userAnswer"] === null &&
              newObj["userAnswer"] === null
            ) {
              if (
                oldObj["userAnswerType"] === "saved_next" &&
                newObj["userAnswerType"] === "marked_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] - 1,
                  marked: state.userActivity["marked"] + 1,
                };
              } else if (
                oldObj["userAnswerType"] === "marked_next" &&
                newObj["userAnswerType"] === "saved_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] + 1,
                  marked: state.userActivity["marked"] - 1,
                };
              }
            } else if (
              oldObj["userAnswer"] === null &&
              newObj["userAnswer"] !== null
            ) {
              if (
                oldObj["userAnswerType"] === "saved_next" &&
                newObj["userAnswerType"] === "saved_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] - 1,
                  answered: state.userActivity["answered"] + 1,
                };
              } else if (
                oldObj["userAnswerType"] === "saved_next" &&
                newObj["userAnswerType"] === "marked_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] - 1,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] + 1,
                };
              } else if (
                oldObj["userAnswerType"] === "marked_next" &&
                newObj["userAnswerType"] === "saved_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  marked: state.userActivity["marked"] - 1,
                  answered: state.userActivity["answered"] + 1,
                };
              } else if (
                oldObj["userAnswerType"] === "marked_next" &&
                newObj["userAnswerType"] === "marked_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  marked: state.userActivity["marked"] - 1,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] + 1,
                };
              }
            } else if (
              oldObj["userAnswer"] !== null &&
              newObj["userAnswer"] === null
            ) {
              if (oldObj["userAnswerType"] === "saved_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] + 1,
                  answered: state.userActivity["answered"] - 1,
                };
              } else if (oldObj["userAnswerType"] === "marked_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_answered: state.userActivity["not_answered"] + 1,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] - 1,
                };
              }
            } else if (
              oldObj["userAnswer"] !== null &&
              newObj["userAnswer"] !== null
            ) {
              if (
                oldObj["userAnswerType"] === "saved_next" &&
                newObj["userAnswerType"] === "marked_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] + 1,
                  answered: state.userActivity["answered"] - 1,
                };
              } else if (
                oldObj["userAnswerType"] === "marked_next" &&
                newObj["userAnswerType"] === "saved_next"
              ) {
                state.userActivity = {
                  ...state.userActivity,
                  answered: state.userActivity["answered"] + 1,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] - 1,
                };
              }
            }
          } else {
            if (newObj["userAnswer"] === null) {
              if (newObj["userAnswerType"] === "saved_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_visited: state.userActivity["not_visited"] - 1,
                  not_answered: state.userActivity["not_answered"] + 1,
                };
              } else if (newObj["userAnswerType"] === "marked_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_visited: state.userActivity["not_visited"] - 1,
                  marked: state.userActivity["marked"] + 1,
                  not_answered: state.userActivity["not_answered"] - 1,
                };
              }
            } else {
              if (newObj["userAnswerType"] === "saved_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_visited: state.userActivity["not_visited"] - 1,
                  answered: state.userActivity["answered"] + 1,
                  not_answered: state.userActivity["not_answered"] - 1,
                };
              } else if (newObj["userAnswerType"] === "marked_next") {
                state.userActivity = {
                  ...state.userActivity,
                  not_visited: state.userActivity["not_visited"] - 1,
                  answered_marked_review:
                    state.userActivity["answered_marked_review"] + 1,
                  not_answered: state.userActivity["not_answered"] - 1,
                };
              }
            }
          }
          return newObj;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllQuestionsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuestionsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        state.questions = action.payload;
        state.userActivity = {
          ...state.userActivity,
          not_visited: action.payload.length,
        };
      })
      .addCase(fetchAllQuestionsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const selectAllQuestions = (state) => state.question?.questions;
export const selectUserActivity = (state) => state.question?.userActivity;

export const { updateQuestionState } = questionSlice.actions;

export default questionSlice.reducer;
