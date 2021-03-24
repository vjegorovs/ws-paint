import { Action } from "@reduxjs/toolkit";

export const TEST_ACTION_PERFORMED = "USER_TEST_ACTION";
export const TEST_ACTION_PERFORMED_WITH_PAYLOAD = "USER_TEST_ACTION_WITH_PAYLOAD";

export function dispatchTestAction() {
    return { type: TEST_ACTION_PERFORMED } as const;
}

export interface TestActionWithoutPayload extends Action {
    type: typeof TEST_ACTION_PERFORMED_WITH_PAYLOAD;
}

export interface TestActionWithPayload extends Action {
    type: typeof TEST_ACTION_PERFORMED_WITH_PAYLOAD;
    payload: boolean;
}
export function dispatchTestActionWithPayload(bool: boolean): TestActionWithPayload {
    return { type: TEST_ACTION_PERFORMED_WITH_PAYLOAD, payload: bool };
}

type TestActions = TestActionWithPayload & TestActionWithoutPayload;


export interface TestState {
    test: boolean;
}

export const intialTestState = {
    test: false,
}


export function testReducer(state = intialTestState, action: TestActions): TestState {
    switch (action.type) {
        case TEST_ACTION_PERFORMED_WITH_PAYLOAD: {
            return { ...state, test: action.payload }
        }
        default:
            return state;
    }
}