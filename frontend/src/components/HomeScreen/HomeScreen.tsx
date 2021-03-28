import * as React from "react";
// import classnames from "classnames";

// import styles from "./HomeScreen.scss";
import { connect } from "react-redux";
import { PropsWithChildren } from "react";
import { RootState } from "../../store";
import { CanvasConnected } from "../Canvas/Canvas";
import { OverlayLayoutConnected } from "../OverlayLayout/OverlayLayout";
import { Outlet, useLocation } from "react-router-dom";
import { RouteProps } from "react-router";

export interface HomeScreenOwnProps {

}

export interface HomeScreenStateProps {

}

export interface HomeScreenDispatchProps {

}

export type HomeScreenProps = HomeScreenOwnProps | HomeScreenStateProps | HomeScreenDispatchProps;

export function HomeScreen(props: PropsWithChildren<HomeScreenProps> & RouteProps): JSX.Element {
	const location = useLocation();
	console.log(location);
	return (
		<>
			<CanvasConnected />
			<OverlayLayoutConnected />
			<Outlet />
		</>
	);
}

function mapStateToProps(state: RootState, ownProps: HomeScreenOwnProps): HomeScreenProps {
	return {

	};
}

const mapDispatchToProps = {

};

export const HomeScreenConnected = connect<HomeScreenProps, HomeScreenDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(HomeScreen);
