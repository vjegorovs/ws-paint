import React from "react";

import styles from "./Canvas.scss"
import {connect} from "react-redux";
import {RootState} from "../../index";
import {changeSettings, selectYeet} from "../../reducers/settings";

interface CanvasProps {
    yeet?: boolean
}

interface CanvasDispatchProps {
    yoink?: typeof changeSettings;
}

interface CanvasStateProps {
    isDrawing: boolean;
}

export class Canvas extends React.Component<CanvasProps & CanvasDispatchProps,CanvasStateProps> {
    private readonly myRef;
    private canvasContext: any;

    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            isDrawing: false
        };

        this.myRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        if (this.myRef.current){
            const current = this.myRef.current;
            current.width = window.innerWidth;
            current.height = window.innerHeight;
            this.canvasContext = current.getContext("2d")
            console.log(this.canvasContext);
            this.canvasContext.lineCap = "round";
            this.canvasContext.strokeStyle = "red";
            this.canvasContext.lineWidth = 4;
        }
    }

    public render() {
        return (
            <>
               <canvas
                   className={styles.canvas}
                   ref={this.myRef}
                   onMouseMove={(e) => {this.state.isDrawing && this.draw(e)}}
                   onMouseDown={(e) => {
                       console.log("MouseDOWN");
                       console.log(e);
                       this.start(e);
                   }}
                   onMouseUp={() => {
                       console.log("MouseUP")
                       this.end();
                   }}
               >

               </canvas>
                <h1>oops</h1>
            </>
        )
    }

    private start = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = ev.nativeEvent;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(offsetX, offsetY);
        this.setState({isDrawing: true});
    }

    private end = () => {
        this.canvasContext.closePath();
        this.setState({isDrawing: false});
    }

    private draw = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = ev.nativeEvent;
        console.log("DRAWINGSDFGSDFHBDXTYJHSRT");
        this.canvasContext.lineTo(offsetX, offsetY);
        this.canvasContext.stroke();
    }
}

function mapStateToProps(state: RootState, ownProps: any): CanvasProps {
    return {
        yeet: selectYeet(state),
    }
}

const mapDispatchToProps = {
    yoink: changeSettings,
}

export const CanvasConnected = connect<CanvasProps,CanvasDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(Canvas);