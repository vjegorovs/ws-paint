import React from "react";
import {mount, shallow} from "enzyme"

import {Canvas, CanvasProps} from "./Canvas"
import { changeCanvasDrawingState, changeCanvasLineWidth, changeCanvasStrokeStyle } from "../../store/canvasSettings";

describe("test test suite",() => {

    const mockDispatchDrawingStateFn = jest.fn() as unknown as typeof changeCanvasDrawingState;

    const mockCanvasProps: CanvasProps = {
        strokeStyle: "black",
        lineWidth: 4,
        isDrawing: false,
        changeDrawingState: mockDispatchDrawingStateFn,
        changeLineWidth: jest.fn() as unknown as typeof changeCanvasLineWidth,
        changeStrokeStyle: jest.fn() as unknown as typeof changeCanvasStrokeStyle,
    }


    test("uno", () =>{
        const testCanvas = shallow(<Canvas {...mockCanvasProps} />)

        expect(testCanvas.find("canvas")).toBeDefined();
    });
    test("dos", () => {
        const testCanvas = mount(<Canvas {...mockCanvasProps} />)
        testCanvas.simulate("mouseDown");
        
        expect(mockDispatchDrawingStateFn).toHaveBeenCalled();

        testCanvas.unmount();
    })
    test("tres", () => {
        // placeholder third test
        const testCanvas = shallow(<Canvas {...mockCanvasProps} />)

        expect(testCanvas.instance()).toBeInstanceOf(Canvas);
    })
})