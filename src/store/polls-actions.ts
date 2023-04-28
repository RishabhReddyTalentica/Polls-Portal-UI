import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { fetchAllPolls } from "../services/api";
import { pollsActions } from "./polls-slice";
import { RootState } from "./store";


export const fetchPollData = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            const pollsData = await fetchAllPolls();
            dispatch(
                pollsActions.updatePolls(pollsData)
            );
        } catch (error) {

        }
    };
};
