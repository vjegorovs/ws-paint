import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOM from "react-dom";

import { App } from "./App";
import "./index.scss";
import { store } from "./store";
import { initSocketConnection } from "./io/ioInit";

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);

initSocketConnection();
