import * as React from "react";
import classnames from "classnames";

import styles from "./TestComponent.scss"
import {connect} from "react-redux";
import {changeSettings, selectYeet} from "../../store/settings";
import {RootState} from "../../store";
import { changeCanvasLineWidth } from "../../store/canvasSettings";

interface TestComponentProps {
    yeet: boolean
}

interface TestComponentDispatchProps {
    yoink: typeof changeSettings;
    test: typeof changeCanvasLineWidth;
}

export class TestComponent extends React.Component<TestComponentProps & TestComponentDispatchProps> {

    public render() {
        return (
            <>
                <button
                    className={styles.pointer}
                    onClick={() => {
                    this.props.yoink(false);
                    this.props.test(22);
                }}>123</button>
                <div className={styles.test}> MOOO </div>
                <div className={classnames(styles.ginormous,{
                    [styles.fun]: true,
                    [styles.pointer]: true,
                })}> Pretty pictures and funny memes </div>
                {this.props.yeet && "the connect worked"}
            </>
        )
    }

}

function mapStateToProps(state: RootState, ownProps: any): TestComponentProps {
    return {
        yeet: selectYeet(state),
    }
}

const mapDispatchToProps = {
    yoink: changeSettings,
    test: changeCanvasLineWidth,
}

export const TestComponentConnected = connect<TestComponentProps,TestComponentDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);