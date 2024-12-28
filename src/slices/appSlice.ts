import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  page: number;
  query: string;
  year: string;
}

const initialState: PageState = {
  page: 1,
  query: "Pokemon",
  year: "",
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
  },
});

export const { setPage, setQuery, setYear } = appSlice.actions;

export default appSlice.reducer;
