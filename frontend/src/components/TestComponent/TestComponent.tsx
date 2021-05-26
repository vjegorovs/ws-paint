import * as React from "react";

import styles from "./TestComponent.scss";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { changeCanvasLineWidth, changeCanvasStrokeStyle } from "../../store/canvasSettings";

interface TestComponentProps {
}

interface TestComponentDispatchProps {
    changeLineWidth: typeof changeCanvasLineWidth;
	changeStrokeStyle: typeof changeCanvasStrokeStyle;
}

export class TestComponent extends React.Component<TestComponentProps & TestComponentDispatchProps> {

	public render() {
		return (
			<>
				<div className={"buttonsContainer"}>
					<button
						className={styles.pointer}
						onClick={() => {
							this.props.changeLineWidth(42);
						}}>BIG</button>
					<button
						className={styles.pointer}
						onClick={() => {
							this.props.changeLineWidth(10);
						}}>SMALL</button>
					<button
						className={styles.pointer}
						onClick={() => {
							this.props.changeStrokeStyle("green");
						}}>GREEN</button>
					<button
						className={styles.pointer}
						onClick={() => {
							this.props.changeStrokeStyle("blue");
						}}>BLUE</button>
				</div>
				<div className={styles.test}> Whiteboard test </div>
			</>
		);
	}

}

function mapStateToProps(state: RootState): TestComponentProps {
	return {};
}

const mapDispatchToProps: TestComponentDispatchProps = {
	changeLineWidth: changeCanvasLineWidth,
	changeStrokeStyle: changeCanvasStrokeStyle,
};

export const TestComponentConnected = connect<TestComponentProps, TestComponentDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);
