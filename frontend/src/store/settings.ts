import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface SettingsState {
    yeet: boolean;
    roomInitialized: boolean;
    userCreated: boolean;
    socketConnectionMade: boolean;
}

export const settingsInitialState: SettingsState = {
	yeet: true,
	roomInitialized: false,
	userCreated: false,
	socketConnectionMade: false,
};

const settingsSlice = createSlice({
	name: "settings",
	initialState: settingsInitialState,
	reducers: {
		changeSettings(state, action: PayloadAction<boolean>) {
			return {
				...state,
				yeet: action.payload,
			};
		},
		changeRoomInitialized(state, action: PayloadAction<boolean>) {
			return {
				...state,
				roomInitialized: action.payload,
			};
		},
		changeUserCreated(state, action: PayloadAction<boolean>) {
			return {
				...state,
				userCreated: action.payload,
			};
		},
		changeSocketConnectionMade(state, action: PayloadAction<boolean>) {
			return {
				...state,
				socketConnectionMade: action.payload,
			};
		},
	},
});

export const { changeSettings } = settingsSlice.actions;

export function selectYeet(state: RootState) {
	return state.settings.yeet;
}

export function selectRoomInitialized(state: RootState) {
	return state.settings.roomInitialized;
}

export function selectUserCreated(state: RootState) {
	return state.settings.userCreated;
}

export function selectSocketConnectionMade(state: RootState) {
	return state.settings.socketConnectionMade;
}

export const settingsReducer = settingsSlice.reducer;
