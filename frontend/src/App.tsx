import * as React from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	Outlet,
	Navigate,
} from "react-router-dom";
import { HomeScreenConnected } from "./components/HomeScreen/HomeScreen";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<HomeScreenConnected />}>
					<Route path="room" element={<Test />}>
						<Route path="/*" element={<div> 2123 </div>} />
						<Route path=":roomId" element={<div> 212fggd3 </div>} />
					</Route>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
}

function Test() {
	return (
		<>
			<div> OY M8 </div>
			<Outlet />
		</>

	);
}
