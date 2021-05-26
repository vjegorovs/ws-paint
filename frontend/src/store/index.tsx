import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { changeSettings, settingsReducer } from "./settings";
import { testReducer } from "../components/TestComponent/state/TestComponent";
import { canvasSettingsReducer } from "./canvasSettings";
import { canvasSettingsMiddleware } from "./middlewares/canvasSettingsMiddleware";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	settings: settingsReducer,
	canvasSettings: canvasSettingsReducer,
	//@ts-ignore
	test: testReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [canvasSettingsMiddleware] as const,
});


export type RootDispatch = typeof store.dispatch;
export type AppDispatch = typeof store.dispatch;


setTimeout(() => {
	console.log("afd");
	store.dispatch(changeSettings(true));
}, 5000);
