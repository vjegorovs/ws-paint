import dotenv from "dotenv";
import express from "express";
import {createServer} from "http";
import { Server, Socket } from "socket.io";

dotenv.config();

const port: String | undefined = process.env.SERVER_PORT || "3333";
const app: express.Application = express();
app.set("port", port)

const httpServer = createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

let mainUserId: string;
const coordinateArray: [number, number][] = [];

export interface CanvasSettingsState {
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
    lineWidth: number;
    isDrawing: boolean;
    pointsToDraw: [number, number][];
    authorDrawing: boolean;
}
let canvasSettings: Partial<CanvasSettingsState> = {};

io.on("connection", (socket: Socket) => {
    console.log(socket.id, " user connected");
    io.emit("connection", "Connection to server established")

    if (!mainUserId) {
        // first one to connect is the presenter
        mainUserId = socket.id
        socket.emit("mainDrawer", {
            isMainDrawer: true,
        })
    }

    // Following prepend is a catch mechanism for all generic incoming messages
    socket.prependAny((event, additionalData: {}) => {
        console.log(`got ${event}`);

        if (event.includes("outGoingMessage")) {
            const incomingEventName = event.split("/")[1];
            console.log(incomingEventName);
            console.log(additionalData);

            //#TODO: Create a handler switch based on eventName, remove current raw "socket.on" listeners
        }
    });

    socket.on("requestFullCatchUp", () => {
        socket.emit("fullCatchUp", coordinateArray);
    })

    socket.on("sendDraw", ({x, y}) => {
        console.log("received", x, " ", y);
        coordinateArray.push([x, y]);
        socket.broadcast.emit("receiveDraw",{
            coordinates: [x, y],
            settings: canvasSettings,
        });
    })

    socket.on("changeSettings", (settingsObject: Partial<CanvasSettingsState>) => {
        console.log("changeSettings", settingsObject);


        if (settingsObject.lineWidth !== canvasSettings.lineWidth || settingsObject.strokeStyle !== canvasSettings.strokeStyle) {
            canvasSettings = { ...settingsObject }
            socket.broadcast.emit("syncCanvasSettings",canvasSettings);
        }
    })

    socket.on("mouseUpEvent", settingsObject => {
        socket.broadcast.emit("receiveMouseUpFromMain", true);
    })

    socket.on("mouseDownEvent", settingsObject => {
        socket.broadcast.emit("receiveMouseDownFromMain", true);
    })
})

httpServer.listen(port, () => {
    console.log(`Backend initiated successfully on port ${port}`);
});
