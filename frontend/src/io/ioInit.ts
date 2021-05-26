import { io, Socket } from "socket.io-client";
import { changeSocketConnectionMade, changeMainDrawer } from "../store/settings";
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

