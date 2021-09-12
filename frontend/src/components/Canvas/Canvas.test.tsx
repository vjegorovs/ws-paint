import React from "react";
import { mount, shallow } from "enzyme";

import { Canvas, CanvasProps } from "./Canvas";
import { changeCanvasDrawingState, changeCanvasLineWidth, changeCanvasStrokeStyle, clearCanvasPointsToDraw } from "../../store/canvasSettings";
import { dispatchGenericOutgoingMessage } from "../../io/ioInit";

describe("test test suite", () => {

	const mockDispatchDrawingStateFn = jest.fn() as unknown as typeof changeCanvasDrawingState;

	const mockCanvasProps: CanvasProps = {
		strokeStyle: "black",
		lineWidth: 4,
		isDrawing: false,
		changeDrawingState: mockDispatchDrawingStateFn,
		changeLineWidth: jest.fn() as unknown as typeof changeCanvasLineWidth,
		changeStrokeStyle: jest.fn() as unknown as typeof changeCanvasStrokeStyle,
		externalPointsToDraw: [],
		clearPointsToDraw: jest.fn() as unknown as typeof clearCanvasPointsToDraw,
		sendMessageToServer: jest.fn() as unknown as typeof dispatchGenericOutgoingMessage,
		isMainDrawer: true,
		authorDrawing: false,
	};


	test("uno", () => {
		const testCanvas = shallow(<Canvas {...mockCanvasProps} />);

		expect(testCanvas.find("canvas")).toBeDefined();
	});
	test("dos", () => {
		const testCanvas = mount(<Canvas {...mockCanvasProps} />);
		testCanvas.simulate("mouseDown");

		expect(mockDispatchDrawingStateFn).toHaveBeenCalled();

		testCanvas.unmount();
	});
	test("tres", () => {
		// placeholder third test
		const testCanvas = shallow(<Canvas {...mockCanvasProps} />);
		expect(testCanvas.instance()).toBeInstanceOf(Canvas);
	});
});
