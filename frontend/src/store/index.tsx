import { configureStore } from "@reduxjs/toolkit";
import { changeSettings, settingsReducer } from "./settings";
import { testReducer } from "../components/TestComponent/state/TestComponent";
import { canvasSettingsReducer } from "./canvasSettings";


export const store = configureStore({
	reducer: {
		settings: settingsReducer,
		canvasSettings: canvasSettingsReducer,
		//@ts-ignore
		test: testReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

console.log(changeSettings(false));
console.log(store.dispatch(changeSettings(false)));

setTimeout(() => {
	console.log("afd");
	store.dispatch(changeSettings(true));
}, 5000);
