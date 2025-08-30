import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   employData : [],
};

export const employSlice = createSlice({
    name: "employ",
    initialState,
    reducers: {
        setEmployData: (state, action) => {
            state.employData = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setEmployData } = employSlice.actions;

export default employSlice.reducer;
