import React from "react";
import {mount, shallow} from "enzyme"

import {Canvas, CanvasProps} from "./Canvas"
import { changeCanvasDrawingState, changeCanvasLineWidth, changeCanvasStrokeStyle } from "../../store/canvasSettings";

describe("test test suite",() => {

    const mockCanvasProps: CanvasProps = {
        strokeStyle: "black",
        lineWidth: 4,
        isDrawing: false,
        changeDrawingState: jest.fn() as unknown as typeof changeCanvasDrawingState,
        changeLineWidth: jest.fn() as unknown as typeof changeCanvasLineWidth,
        changeStrokeStyle: jest.fn() as unknown as typeof changeCanvasStrokeStyle,
    }


    test("uno", () =>{
        const testCanvas = shallow(<Canvas {...mockCanvasProps} />)

        expect(testCanvas.find("h1").text()).toBe("oops");
    });
    test("dos", () => {
        const testCanvas = mount(<Canvas {...mockCanvasProps} />)
        testCanvas.simulate("mouseDown");
        
        expect(testCanvas.state()).toEqual({
            isDrawing: true,
        });

        testCanvas.unmount();
    })
})