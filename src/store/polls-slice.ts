import { createSlice } from '@reduxjs/toolkit';


export const initialState: any = {
    polls: [],
}

const pollsSlice = createSlice({
    name: "polls",
    initialState: initialState,
    reducers: {
        updatePolls: (state, action) => {
            state.polls = action.payload;
        },
    }
});

export const pollsActions = pollsSlice.actions;
export default pollsSlice;
