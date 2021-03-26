import * as React from "react";
import {CanvasConnected} from "./components/Canvas/Canvas";
import {OverlayLayoutConnected} from "./components/OverlayLayout/OverlayLayout";

export function App() {
    return (
        <>
            <CanvasConnected />
            <OverlayLayoutConnected />
        </>
    );
}