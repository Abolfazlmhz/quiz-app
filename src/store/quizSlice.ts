import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  type: string | null;
  quizIdx: number;
  correct: number;
  answered: number[];
  size: number;
}

const initialState: QuizState = {
  type: null,
  quizIdx: 1,
  correct: 0,
  answered: [],
  size: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setQuizIdx: (state, action: PayloadAction<number>) => {
      state.quizIdx = action.payload;
    },
    incrementCorrect: (state) => {
      state.correct += 1;
    },
    addAnswered: (state, action: PayloadAction<number>) => {
      if (!state.answered.includes(action.payload)) {
        state.answered.push(action.payload);
      }
    },
    resetQuiz: (state) => {
      state.quizIdx = 1;
      state.correct = 0;
      state.answered = [];
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
});

export const {
  setQuizType,
  setQuizIdx,
  incrementCorrect,
  addAnswered,
  resetQuiz,
  setSize,
} = quizSlice.actions;

export default quizSlice.reducer;
