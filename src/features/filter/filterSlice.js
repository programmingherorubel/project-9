import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: [],
        search: "",
    },
    reducers: {
        initialFilter: (state, action) => {
            state.filter = action.payload;
        },
        applyFilter(state, action) {
            // check if the payload is already in the array
            if (state.filter.includes(action.payload)) {

                state.filter = state.filter.filter(item => item !== action.payload);
            } else {

                state.filter.push(action.payload);
            }
        },

        applySearch(state, action) {
            state.search = action.payload;
        },
    },
});

export const { applySearch, applyFilter, initialFilter } = filterSlice.actions;
export default filterSlice.reducer;