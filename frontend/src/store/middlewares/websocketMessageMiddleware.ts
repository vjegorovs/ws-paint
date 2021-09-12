import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { GENERIC_OUTGOING_MESSAGE, GenericOutgoingMessage, sendMessageToServerWrapper } from "../../io/ioInit";
import { selectCanvasDrawingState } from "../canvasSettings";

export const websocketMessageMiddleware: Middleware<
    (action: AnyAction) => number,
    RootState
    > = (store) => (next) => (action: GenericOutgoingMessage) => {
    	const result = next(action);

    	if (action.type === GENERIC_OUTGOING_MESSAGE) {
    		console.log("YES", action);
    		sendMessageToServerWrapper(
    			store.getState(),
    			action.payload.messageType,
    			{
    				additionalData: action.payload.additionalData,
    			},
    			selectCanvasDrawingState,
    		);
    	}

    	return result;
    };
