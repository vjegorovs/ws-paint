import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { sendSettingsToServer } from "../../io/ioInit";
import { selectRecentlySyncedWithServer } from "../canvasSettings";

export const canvasSettingsMiddleware: Middleware<
    (action: AnyAction) => number,
    RootState
    > = (store) => (next) => (action: AnyAction) => {
    	const result = next(action);
    	if (!selectRecentlySyncedWithServer(store.getState())) {

    	    if(action.type === "canvasSettings/changeCanvasStrokeStyle" || action.type === "canvasSettings/changeCanvasLineWidth") {
    			console.log("MATCH");
    			sendSettingsToServer(store.getState());
    		}
    	}




    	return result;
    };
