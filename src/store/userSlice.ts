import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  isLoggedIn: boolean;
  score?: number;
}

const initialState: UserState = {
  name: "",
  isLoggedIn: false,
  score: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.isLoggedIn = false;
      state.score = 0;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const { login, logout, updateScore } = userSlice.actions;
export default userSlice.reducer;
