import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface CanvasSettingsState {
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
    lineWidth: number;
    isDrawing: boolean;
    pointsToDraw: [number, number][];
    authorDrawing: boolean;
    recentlySyncedWithServer: boolean;
}

export const canvasSettingsInitialState: CanvasSettingsState = {
	strokeStyle: "black",
	lineWidth: 4,
	isDrawing: false,
	pointsToDraw: [],
	authorDrawing: false,
	recentlySyncedWithServer: false,
};

const canvasSettingsSlice = createSlice({
	name: "canvasSettings",
	initialState: canvasSettingsInitialState,
	reducers: {
		changeCanvasStrokeStyle(state: CanvasSettingsState, action: PayloadAction<CanvasFillStrokeStyles["strokeStyle"]>) {
			return {
				...state,
				strokeStyle: action.payload,
			};
		},
		changeCanvasLineWidth(state: CanvasSettingsState, action: PayloadAction<number>) {
			console.log("canvasLineWidtjdgsdkbjvnsr;tbkjnsrtb");
			if (action.payload < 1) {
				return state;
			} else {
				return {
					...state,
					lineWidth: action.payload,
				};
			}
		},
		changeCanvasDrawingState(state: CanvasSettingsState, action: PayloadAction<boolean>) {
			return {
				...state,
				isDrawing: action.payload,
			};
		},
		addCanvasPointsToDraw(state: CanvasSettingsState, action: PayloadAction<[number, number]>) {
			state.pointsToDraw.push(action.payload);
		},
		addCanvasPointsToDrawBulk(state: CanvasSettingsState, action: PayloadAction<[number, number][]>) {
			state.pointsToDraw.push(...action.payload);
		},
		clearCanvasPointsToDraw(state: CanvasSettingsState) {
			return {
				...state,
				pointsToDraw: [],
			};
		},
		toggleAuthorDrawing(state: CanvasSettingsState) {
			console.log("AUTHOR DRAWING FROM", state.authorDrawing, "TO ", !state.authorDrawing);
			state.authorDrawing = !state.authorDrawing;
		},
		toggleRecentlySyncedWithServer(state: CanvasSettingsState) {
			state.recentlySyncedWithServer = !state.recentlySyncedWithServer;
		},
	},
});

export const { changeCanvasLineWidth, changeCanvasDrawingState, changeCanvasStrokeStyle, addCanvasPointsToDraw, addCanvasPointsToDrawBulk, clearCanvasPointsToDraw, toggleAuthorDrawing, toggleRecentlySyncedWithServer } = canvasSettingsSlice.actions;

export function selectCanvasStrokeStyle(state: RootState) {
	return state.canvasSettings.strokeStyle;
}

export function selectCanvasLineWidth(state: RootState) {
	return state.canvasSettings.lineWidth;
}

export function selectCanvasDrawingState(state: RootState) {
	return state.canvasSettings.isDrawing;
}

export function selectCanvasPointsToDraw(state: RootState) {
	return state.canvasSettings.pointsToDraw;
}

export function selectAuthorDrawing(state: RootState) {
	return state.canvasSettings.authorDrawing;
}

export function selectRecentlySyncedWithServer(state: RootState) {
	return state.canvasSettings.recentlySyncedWithServer;
}

export function selectCanvasSettingsState(state: RootState) {
	return state.canvasSettings;
}

export const canvasSettingsReducer = canvasSettingsSlice.reducer;
