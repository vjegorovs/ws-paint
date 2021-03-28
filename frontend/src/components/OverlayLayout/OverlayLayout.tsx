import * as React from "react";
// import classnames from "classnames";

import styles from "./OverlayLayout.scss";
import { connect } from "react-redux";
import { TestComponentConnected } from "../TestComponent/TestComponent";
import { PropsWithChildren } from "react";
import { RootState } from "../../store";

export interface OverlayLayoutOwnProps {

}

export interface OverlayLayoutStateProps {

}

export interface OverlayLayoutDispatchProps {

}

export type OverlayLayoutProps = OverlayLayoutOwnProps | OverlayLayoutStateProps | OverlayLayoutDispatchProps;

export function OverlayLayout({ children }: PropsWithChildren<OverlayLayoutProps>): JSX.Element {

	return (
		<div className={styles.overlayWrapper}>
			<div className={styles.test}>Yeet</div>
			{children}
			<TestComponentConnected />
		</div>
	);
}

function mapStateToProps(state: RootState, ownProps: OverlayLayoutOwnProps): OverlayLayoutProps {
	return {

	};
}

const mapDispatchToProps = {

};

export const OverlayLayoutConnected = connect<OverlayLayoutProps, OverlayLayoutDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(OverlayLayout);
