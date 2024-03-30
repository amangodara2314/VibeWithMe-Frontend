import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    fav: [],
  },
  reducers: {
    logoutAction(state) {
      state.user = null;
      state.fav = [];
      localStorage.removeItem("user");
      localStorage.removeItem("fav");
    },
    login(state, { payload }) {
      state.user = payload.user;
      if (!payload.signup) {
        state.fav = payload.user.favoriteSongs;
        localStorage.setItem("fav", JSON.stringify(state.fav));
      } else {
        state.fav = [];
      }
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    lsToState(state) {
      const user = JSON.parse(localStorage.getItem("user"));
      const fav = JSON.parse(localStorage.getItem("fav"));
      state.user = user;
      state.fav = fav;
    },
    favPlaylist(state, { payload }) {
      state.fav = payload.fav;
      localStorage.setItem("fav", JSON.stringify(state.fav));
    },
  },
});

export const { login, logoutAction, lsToState, favPlaylist } =
  UserSlice.actions;

export default UserSlice.reducer;
