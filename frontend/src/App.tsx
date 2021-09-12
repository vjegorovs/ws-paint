import * as React from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { HomeScreenConnected } from "./components/HomeScreen/HomeScreen";

// React.lazy() route component importing?
// wrap suspense around router

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<HomeScreenConnected />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}
