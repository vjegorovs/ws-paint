import React from "react";
import {mount, shallow} from "enzyme"

import { Canvas } from "./Canvas"

describe("test test suite",() => {
    test("uno", () =>{
        const testCanvas = shallow(<Canvas />)

        expect(testCanvas.find("h1").text()).toBe("oops");
    });
    test("dos", () => {
        const testCanvas = mount(<Canvas />)
        testCanvas.simulate("mouseDown");
        
        expect(testCanvas.state()).toEqual({
            isDrawing: true,
        });

        testCanvas.unmount();
    })
})