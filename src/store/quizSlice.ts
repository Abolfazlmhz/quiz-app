import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizResult {
  [username: string]: {
    [quizType: string]: {
      correct: number;
      total: number;
      date: string;
    }[];
  };
}

interface QuizState {
  type: string | null;
  quizIdx: number;
  correct: number;
  answered: number[];
  answers: Record<number, string>;
  size: number;
  results: QuizResult;
  currentUser: string | null;
}

const initialState: QuizState = {
  type: null,
  quizIdx: 1,
  correct: 0,
  answered: [],
  answers: {},
  size: 0,
  results: {},
  currentUser: null,
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
    setAnswer: (
      state,
      action: PayloadAction<{ id: number; answer: string }>
    ) => {
      if (!state.answers) state.answers = {}; // ✅ احتیاطی
      state.answers[action.payload.id] = action.payload.answer;
    },
    resetQuiz: (state) => {
      state.quizIdx = 1;
      state.correct = 0;
      state.answered = [];
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    saveResult: (state) => {
      const user = state.currentUser;
      const type = state.type;
      if (!user || !type) return;
      // اگه هنوز state.results وجود نداره، مطمئن شو ساخته بشه
      if (!state.results) {
        state.results = {};
      }
      // اگه یوزر تو results نیست، بسازش
      if (!state.results[user]) {
        state.results[user] = {};
      }
      // اگه نوع آزمون برای این یوزر نیست، بسازش
      if (!state.results[user][type]) {
        state.results[user][type] = [];
      }
      state.results[user][type].push({
        correct: state.correct,
        total: state.size,
        date: new Date().toISOString(),
      });
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  setQuizType,
  setQuizIdx,
  incrementCorrect,
  addAnswered,
  setAnswer,
  resetQuiz,
  setSize,
  setCurrentUser,
  saveResult,
} = quizSlice.actions;

export default quizSlice.reducer;
