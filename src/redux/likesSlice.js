import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },

  reducers: {
    addLike: (state, action) => {
      state.likes = action.payload;
    },
  },
});

export const { addLike } = likesSlice.actions;

export default likesSlice.reducer;
