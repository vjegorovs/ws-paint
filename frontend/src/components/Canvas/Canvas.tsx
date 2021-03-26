import React from "react";

import styles from "./Canvas.scss"
import {connect} from "react-redux";
import {RootState} from "../../index";
import {changeSettings, selectYeet} from "../../reducers/settings";

interface CanvasProps {
    yeet?: boolean;
}

interface CanvasDispatchProps {
    yoink?: typeof changeSettings;
}

interface CanvasStateProps {
    isDrawing: boolean;
}

export class Canvas extends React.Component<CanvasProps & CanvasDispatchProps,CanvasStateProps> {
    private readonly myRef;
    private canvasElement: HTMLCanvasElement | undefined;
    private canvasContext: CanvasRenderingContext2D | null | undefined;
    private drawingQueue: [number,number][] = [];
    private queueCounter: number = 0;

    constructor(props: CanvasProps) {
        super(props);
        this.state = {
            isDrawing: false
        };

        this.myRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        if (this.myRef.current){
            this.canvasElement = this.myRef.current;
            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;
            this.canvasContext = this.canvasElement.getContext("2d")
            console.log(this.canvasContext);
            if (this.canvasContext) {
                this.canvasContext.lineCap = "round";
                this.canvasContext.strokeStyle = "black";
                this.canvasContext.lineWidth = 24;
            }

            document.querySelector("body")!.addEventListener("mousemove", (e) => this.state.isDrawing && this.draw(e as unknown as React.MouseEvent<HTMLCanvasElement, MouseEvent>, true))
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
        this.clearQueue();
        this.addPointToQueue(offsetX, offsetY);
        if (this.canvasContext) {
            this.setState({isDrawing: true});
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(offsetX, offsetY);
        }
    }

    private end = () => {
        // this.canvasContext!.closePath();
        this.setState({isDrawing: false});
    }

    private drawTick = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>, body = false) => {
        let offsetX: number, offsetY: number;
        if (body){
            offsetX = (ev as unknown as MouseEvent).offsetX;
            offsetY = (ev as unknown as MouseEvent).offsetY;
        } else {
            offsetX = ev.nativeEvent.offsetX;
            offsetY = ev.nativeEvent.offsetY;
        }
        if (this.state.isDrawing && this.canvasContext) {
            console.log("DRAWINGSDFGSDFHBDXTYJHSRT");
            this.canvasContext.lineTo(offsetX, offsetY);
            this.canvasContext.stroke();
        }
    }

    private clearQueue = () => {
        this.queueCounter = 0;
        this.drawingQueue = [];
    }

    private addPointToQueue = (x:number, y:number) => {
        this.drawingQueue.push([x, y])
    }

    private drawingHandle() {

    }
}

// // this.canvasContext.lineTo(offsetX, offsetY);
// // this.canvasContext.stroke();
//
// requestAnimationFrame(() => {
//     this.canvasContext.moveTo(offsetX, offsetY);
//     this.canvasContext.arc(Math.round(offsetX),Math.round(offsetY),8,0,Math.PI * 2);
//     this.canvasContext.arc(Math.round(offsetX),Math.round(offsetY),8,0,Math.PI * 2);
//     this.canvasContext.fill();
// })

function mapStateToProps(state: RootState, ownProps: any): CanvasProps {
    return {
        yeet: selectYeet(state),
    }
}

const mapDispatchToProps = {
    yoink: changeSettings,
}

export const CanvasConnected = connect<CanvasProps,CanvasDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(Canvas);