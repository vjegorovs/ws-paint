import * as React from "react";
import classnames from "classnames";

import styles from "./OverlayLayout.scss";
import { connect } from "react-redux";
import { TestComponentConnected } from "../TestComponent/TestComponent";
import { PropsWithChildren } from "react";
import { RootState } from "../../store";
import { selectCanvasDrawingState } from "../../store/canvasSettings";

export interface OverlayLayoutProps {
	isDrawing: boolean;
}

export interface OverlayLayoutDispatchProps {

}

export function OverlayLayout({ isDrawing, children }: PropsWithChildren<OverlayLayoutProps & OverlayLayoutDispatchProps>) {

	return (
		<div className={styles.overlayWrapper}>
			<div className={styles.overlayTop} />
			<div className={classnames(styles.overlayBottom, {
				[styles.isDrawing]: isDrawing,
			})}>
				<TestComponentConnected />
			</div>
		</div>
	);
}

function mapStateToProps(state: RootState): OverlayLayoutProps {
	return {
		isDrawing: selectCanvasDrawingState(state),
	};
}

const mapDispatchToProps = {

};

export const OverlayLayoutConnected = connect<OverlayLayoutProps, OverlayLayoutDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(OverlayLayout);
