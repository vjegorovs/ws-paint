import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./index";

export interface CanvasSettingsState {
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
    lineWidth: number;
    isDrawing: boolean;
}

export const canvasSettingsInitialState: CanvasSettingsState = {
    strokeStyle: "black",
    lineWidth: 4,
    isDrawing: false,
}

const canvasSettingsSlice = createSlice({
    name: "canvasSettings",
    initialState: canvasSettingsInitialState,
    reducers: {
        changeCanvasStrokeStyle(state: CanvasSettingsState ,action: PayloadAction<CanvasFillStrokeStyles["strokeStyle"]>) {
            return {
                ...state,
                strokeStyle: action.payload,
            }
        },
        changeCanvasLineWidth(state: CanvasSettingsState ,action: PayloadAction<number>) {
            if (action.payload < 1) {
                return state;
            } else {
                return {
                    ...state,
                    lineWidth: action.payload,
                }
            }
        },
        changeCanvasDrawingState(state: CanvasSettingsState ,action: PayloadAction<boolean>) {
            return {
                ...state,
                isDrawing: action.payload,
            }
        }
    }
});

export const { changeCanvasLineWidth, changeCanvasDrawingState, changeCanvasStrokeStyle } = canvasSettingsSlice.actions

export function selectCanvasStrokeStyle(state: RootState) {
    return state.canvasSettings.strokeStyle;
}

export function selectCanvasLineWidth(state: RootState) {
    return state.canvasSettings.lineWidth;
}

export function selectCanvasDrawingState(state: RootState) {
    return state.canvasSettings.isDrawing;
}

export const canvasSettingsReducer = canvasSettingsSlice.reducer;
