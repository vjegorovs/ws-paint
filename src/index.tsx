import * as React from "react";
import * as ReactDOM from "react-dom";
import classnames from "classnames";

import styles from "./index.scss"

class TestComponent extends React.Component<any, any> {
    public render() {
        return (
            <>
                <div className={styles.test}> MOOO </div>
                <button>123</button>
                <div className={classnames(styles.ginormous,{
                    [styles.fun]: true,
                })}> Pretty pictures and funny memes </div>
            </>
        )
    }
}
const boil: string = "toot";
export function El(props: any): JSX.Element {
    return (<div>yeet</div>)
}

function App() {
    return (
        <>
            <TestComponent />
            <El />
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
console.log(boil)