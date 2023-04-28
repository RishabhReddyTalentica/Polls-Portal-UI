import { configureStore } from '@reduxjs/toolkit';

import pollsSlice from './polls-slice';


const store = configureStore({
    reducer: { polls: pollsSlice.reducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
