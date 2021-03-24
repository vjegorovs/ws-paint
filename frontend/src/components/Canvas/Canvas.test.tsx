import React from "react";
import { shallow } from "enzyme"

import { Canvas } from "./Canvas"

describe("test test suite",() => {
    test("uno", () =>{
        const testCanvas = shallow(<Canvas />)

        expect(testCanvas.find("h1").text()).toBe("oops");
    })
})