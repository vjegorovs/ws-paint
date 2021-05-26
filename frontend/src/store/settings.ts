import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface SettingsState {
    yeet: boolean;
    roomInitialized: boolean;
    userCreated: boolean;
    socketConnectionMade: boolean;
    isMainDrawer: boolean;
}

export const settingsInitialState: SettingsState = {
	yeet: true,
	roomInitialized: false,
	userCreated: false,
	socketConnectionMade: false,
	isMainDrawer: false,
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
		changeMainDrawer(state, action: PayloadAction<boolean>) {
			return {
				...state,
				isMainDrawer: action.payload,
			};
		},
	},
});

export const { changeSettings, changeSocketConnectionMade, changeMainDrawer } = settingsSlice.actions;

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

export function selectMainDrawer(state: RootState) {
	return state.settings.isMainDrawer;
}

export const settingsReducer = settingsSlice.reducer;
