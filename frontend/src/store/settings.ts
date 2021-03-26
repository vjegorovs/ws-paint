import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

export interface SettingsState {
    yeet: boolean;
}

export const settingsInitialState: SettingsState = {
    yeet: true,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: settingsInitialState,
    reducers: {
        changeSettings(state ,action: PayloadAction<boolean>) {
            return {
                ...state,
                yeet: action.payload,
            }
        }
    }
});

export const { changeSettings } = settingsSlice.actions

export function selectYeet(state: RootState) {
    return state.settings.yeet;
}

export const settingsReducer = settingsSlice.reducer;
