import { io, Socket } from "socket.io-client";
import { changeSocketConnectionMade, changeMainDrawer } from "../store/settings";
import { RootState, store } from "../store";
import { store } from "../store";

import {
	selectCanvasSettingsState,
	addCanvasPointsToDraw,
	toggleAuthorDrawing,
	changeCanvasStrokeStyle,
	changeCanvasLineWidth,
	toggleRecentlySyncedWithServer,
	selectRecentlySyncedWithServer,
	// addCanvasPointsToDrawBulk,
} from "../store/canvasSettings";

import { Selector } from "reselect";
import { Action } from "@reduxjs/toolkit";


const ioServerPath = "http://localhost:7777/";
export let ioTransport: Socket;


// initiate the socket connection after DOM is done and store is initialized
export const initSocketConnection = () => {
	ioTransport = io(ioServerPath);
	ioTransport.on("connection", (socket: Socket) => {
		console.log(socket, " user connected");
	});

	ioTransport.on("mainDrawer", () => {
		store.dispatch(changeMainDrawer(true));
	});


	ioTransport.on("receiveDraw", ({ coordinates, settings }) => {
		store.dispatch(addCanvasPointsToDraw(coordinates));
	});

	// ioTransport.on("fullCatchUp", (coordinates) => {
	// 	console.log(coordinates);
	// 	store.dispatch(toggleAuthorDrawing());
	// 	store.dispatch(addCanvasPointsToDrawBulk(coordinates));
	// });

	ioTransport.on("receiveMouseUpFromMain", ({ coordinates, settings }) => {
		store.dispatch(toggleAuthorDrawing());
	});

	ioTransport.on("receiveMouseDownFromMain", ({ coordinates, settings }) => {
		store.dispatch(toggleAuthorDrawing());
	});

	ioTransport.on("syncCanvasSettings", ({ strokeStyle, lineWidth }) => {
		console.log(strokeStyle, lineWidth);
		if (!selectRecentlySyncedWithServer(store.getState())) {
			store.dispatch(toggleRecentlySyncedWithServer());
		}
		store.dispatch(changeCanvasStrokeStyle(strokeStyle));
		store.dispatch(changeCanvasLineWidth(lineWidth));
	});

	console.log("initSocketConnection", ioTransport);
	store.dispatch(changeSocketConnectionMade(true));

	// ioTransport.emit("requestFullCatchUp");
};

export const sendSettingsToServer = (currentState = store.getState()) => {
	ioTransport.emit("changeSettings", selectCanvasSettingsState(currentState));
};


export const sendMessageToServerWrapper = (
	currentState = store.getState(),
	messageType: string,
	customArgs = {},
	customSelector?: Selector<RootState, any>,
) => {
	ioTransport.emit(`outGoingMessage/${messageType}`, {
		...customArgs,
		extraSelectorData: customSelector?.(currentState),
	});
};

export const GENERIC_OUTGOING_MESSAGE = "GENERIC_OUTGOING_MESSAGE";

export interface GenericOutgoingMessage extends Action {
	type: typeof GENERIC_OUTGOING_MESSAGE;
	payload: {
		messageType: string;
		additionalData: {
			additionalDataType: string;
			data: any;
		} | false;
	};
}

export function dispatchGenericOutgoingMessage(
	messageType: string,
	additionalData: {
		additionalDataType: string;
		data: any;
	} | false = false,
): GenericOutgoingMessage {
	return {
		type: GENERIC_OUTGOING_MESSAGE,
		payload: {
			messageType: messageType,
			additionalData: additionalData,
		},
	};
}
