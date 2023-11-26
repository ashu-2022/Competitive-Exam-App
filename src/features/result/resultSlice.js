import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submit:false,
    'answeredCorrectQuest':[],
    'answeredIncorrectQuest':[],
    'notAnsweredQuest': [],
    'allQuest':[],
    'score':0,
}

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        submitExam: (state, action) => {
            let userSubmission = action.payload;
            console.log("-- submitExam userSubmission --", userSubmission);
            state.allQuest = userSubmission
            userSubmission.map(questItem => {
                let { userAnswer, difficulty, correct_answer } = questItem;
                if (userAnswer) {
                    if (userAnswer === correct_answer) {
                        state.answeredCorrectQuest.push(questItem)
                        switch (difficulty) {
                            case 'easy':
                                state.score += 1
                                break;
                            case 'medium':
                                state.score += 2
                                break;
                            case 'hard':
                                state.score += 3
                                break;
                            default:
                                console.log("debug why defaut case run", difficulty);
                        }
                    } else {
                        state.answeredIncorrectQuest.push(questItem)
                    }
                    
                } else {
                    state.notAnsweredQuest.push(questItem)
                }
            })
            state.submit = true;
          },
    }
})

export const {submitExam } = resultSlice.actions;

export const selectResult = (state) => state.result;

export default resultSlice.reducer;