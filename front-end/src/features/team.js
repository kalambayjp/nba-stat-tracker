import { createSlice } from "@reduxjs/toolkit";

export const selectedTeamsSlice = createSlice({
  name: "selectedTeams",
  initialState: {
    value: {
      name: "",
      logo: "",
    },
  },
  reducers: {
    setSelectedTeams: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTeams } = selectedTeamsSlice.actions;
export default selectedTeamsSlice.reducer;
