import * as React from "react";
import classnames from "classnames";

import styles from "./OverlayLayout.scss";
import { connect } from "react-redux";
import { TestComponentConnected } from "../TestComponent/TestComponent";
import { RootState } from "../../store";
import { selectAuthorDrawing, selectCanvasDrawingState } from "../../store/canvasSettings";

export interface OverlayLayoutProps {
	isDrawing: boolean;
	isAuthorDrawing: boolean;
}

export interface OverlayLayoutDispatchProps {

}

export function OverlayLayout({ isDrawing, isAuthorDrawing, children }: React.PropsWithChildren<OverlayLayoutProps & OverlayLayoutDispatchProps>) {

	const [isOverlayBottomHidden, setIsOverlayBottomHidden] = React.useState(false);

	let timeOutId: ReturnType<typeof setTimeout>;

	React.useEffect(() => {
		clearTimeout(timeOutId);
		timeOutId = setTimeout(() => {
			setIsOverlayBottomHidden(isDrawing || isAuthorDrawing);
		}, 1000);
		return () => clearTimeout(timeOutId);
	}, [isDrawing, isAuthorDrawing]);

	return (
		<div className={styles.overlayWrapper}>
			<div className={styles.overlayTop} />
			<div className={classnames(styles.overlayBottom, {
				[styles.isDrawing]: isOverlayBottomHidden,
			})}>
				<TestComponentConnected />
			</div>
		</div>
	);
}

function mapStateToProps(state: RootState): OverlayLayoutProps {
	return {
		isDrawing: selectCanvasDrawingState(state),
		isAuthorDrawing: selectAuthorDrawing(state),
	};
}

const mapDispatchToProps = {

};

export const OverlayLayoutConnected = connect<OverlayLayoutProps, OverlayLayoutDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(OverlayLayout);
