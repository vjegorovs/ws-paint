import * as React from "react";
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import * as ReactDOM from "react-dom";

import { App } from "./App";
import { settingsReducer, changeSettings} from './reducers/settings'
import { testReducer } from "./components/TestComponent/state/TestComponent";
import "./index.scss"

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        //@ts-ignore
        test: testReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

console.log(changeSettings(false));
console.log(store.dispatch(changeSettings(false)));

setTimeout(()=>{
    console.log("afd");
    store.dispatch(changeSettings(true))
}, 5000)