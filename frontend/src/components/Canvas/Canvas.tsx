import React from "react";

import styles from "./Canvas.scss"
import {connect} from "react-redux";
import {RootState} from "../../index";
import {changeSettings, selectYeet} from "../../reducers/settings";
import {X, Y} from "./CanvasConsts";

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
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;
            this.canvasElement.width = innerWidth * 2;
            this.canvasElement.height = innerHeight * 2;
            this.canvasElement.style.width = `${innerWidth}px`;
            this.canvasElement.style.height = `${innerHeight}px`;
            this.canvasContext = this.canvasElement.getContext("2d")
            console.log(this.canvasContext);
            if (this.canvasContext) {
                this.canvasContext.scale(2, 2);
                this.canvasContext.lineCap = "round";
                this.canvasContext.strokeStyle = "black";
                this.canvasContext.lineWidth = 15;
                this.canvasContext.translate(0.5, 0.5);
            }

            // document.querySelector("body")!.addEventListener("mousemove", (e) => this.state.isDrawing && this.draw(e as unknown as React.MouseEvent<HTMLCanvasElement, MouseEvent>, true))
            this.drawTick();
        }
    }

    public render() {
        return (
            <>
               <canvas
                   className={styles.canvas}
                   ref={this.myRef}
                   onMouseMove={(e) => {
                       if (this.state.isDrawing) {
                           console.log("ISDRAWING");
                        this.addPointToQueue(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
                       }
                   }}
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
        this.setState({isDrawing: true});
        this.drawTick();
    }

    private end = () => {
        this.setState({isDrawing: false});
    }

    private drawTick = () => {
       let throttle = 1;
       if(!this.canvasContext || this.drawingQueue.length === 0){
           return;
       }

       if (this.drawingQueue.length - this.queueCounter > 1) {
           this.canvasContext.beginPath();

           if (this.queueCounter === 0){
               this.canvasContext.moveTo(this.drawingQueue[0][X], this.drawingQueue[0][Y])
           } else {
               this.canvasContext.moveTo(this.drawingQueue[this.queueCounter - 1][X], this.drawingQueue[this.queueCounter - 1][Y])
           }

           for (++this.queueCounter; --throttle >= 0 && this.queueCounter < this.drawingQueue.length; ++this.queueCounter) {
               this.canvasContext.lineTo(this.drawingQueue[this.queueCounter][X], this.drawingQueue[this.queueCounter][Y]);
           }

           this.canvasContext.stroke();
       }

       requestAnimationFrame(this.drawTick);
    }

    private clearQueue = () => {
        this.queueCounter = 0;
        this.drawingQueue = [];
    }

    private addPointToQueue = (x:number, y:number) => {
        this.drawingQueue.push([x, y])
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