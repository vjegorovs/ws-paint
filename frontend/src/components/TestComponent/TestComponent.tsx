import * as React from "react";
import classnames from "classnames";

import styles from "./TestComponent.scss"
import {connect} from "react-redux";
import {RootState} from "../../index";
import {changeSettings, selectYeet} from "../../reducers/settings";

interface TestComponentProps {
    yeet: boolean
}

interface TestComponentDispatchProps {
    yoink: typeof changeSettings;
}

export class TestComponent extends React.Component<TestComponentProps & TestComponentDispatchProps> {



    public render() {
        return (
            <>
                <div className={styles.test}> MOOO </div>
                <button onClick={() => this.props.yoink(false)}>123</button>
                <div className={classnames(styles.ginormous,{
                    [styles.fun]: true,
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
}

export const TestComponentConnected = connect<TestComponentProps,TestComponentDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);