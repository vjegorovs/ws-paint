import * as React from "react";
import { TestComponentConnected } from "./components/TestComponent/TestComponent";
import {CanvasConnected} from "./components/Canvas/Canvas";

export function App() {
    return (
        <>
            <CanvasConnected />
            <div>test</div>
            <TestComponentConnected />
        </>
    );
}