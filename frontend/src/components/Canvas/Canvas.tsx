import React from "react";

import styles from "./Canvas.scss";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { X, Y } from "./CanvasConsts";
import {
	changeCanvasDrawingState,
	changeCanvasLineWidth,
	changeCanvasStrokeStyle,
	selectCanvasDrawingState,
	selectCanvasLineWidth,
	selectCanvasStrokeStyle,
} from "../../store/canvasSettings";

export interface CanvasOwnProps {
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
    lineWidth: number;
    isDrawing: boolean;
}

export interface CanvasDispatchProps {
    changeLineWidth: typeof changeCanvasLineWidth;
    changeDrawingState: typeof changeCanvasDrawingState;
    changeStrokeStyle: typeof changeCanvasStrokeStyle;
}

export type CanvasProps = CanvasOwnProps & CanvasDispatchProps;

export class Canvas extends React.Component<CanvasProps> {
    private readonly myRef;
    private canvasElement: HTMLCanvasElement | undefined;
    private canvasContext: CanvasRenderingContext2D | null | undefined;
    private drawingQueue: [number, number][] = [];
    private queueCounter = 0;
    private animationFrameId: number | null = null;

    constructor(props: CanvasProps) {
    	super(props);
    	this.myRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
    	if (this.myRef.current) {
    		this.canvasElement = this.myRef.current;
    		const innerWidth = window.innerWidth;
    		const innerHeight = window.innerHeight;
    		this.canvasElement.width = innerWidth * 2; // get value from window.devicePixelRatio
    		this.canvasElement.height = innerHeight * 2;
    		this.canvasElement.style.width = `${innerWidth}px`;
    		this.canvasElement.style.height = `${innerHeight}px`;
    		this.canvasContext = this.canvasElement.getContext("2d");
    		console.log(this.canvasContext);
    		if (this.canvasContext) {
    			this.canvasContext.scale(2, 2);
    			this.canvasContext.lineCap = "round";
    			this.canvasContext.strokeStyle = this.props.strokeStyle;
    			this.canvasContext.lineWidth = this.props.lineWidth;
    			this.canvasContext.translate(0.5, 0.5);
    		}

    		// document.querySelector("body")!.addEventListener("mousemove", (e) => this.state.isDrawing && this.draw(e as unknown as React.MouseEvent<HTMLCanvasElement, MouseEvent>, true))
    		this.drawTick();
    	}
    }

    public shouldComponentUpdate(nextProps: CanvasProps): boolean {
    	return (nextProps.lineWidth !== this.props.lineWidth
            || nextProps.strokeStyle !== this.props.strokeStyle
    	);
    }

    public componentDidUpdate(prevProps: Readonly<CanvasProps>, prevState: Readonly<{}>, snapshot?: any) {
    	if (this.canvasContext) {
    		this.canvasContext.lineWidth = this.props.lineWidth;
    		this.canvasContext.strokeStyle = this.props.strokeStyle;
    	}
    }

    public render() {
    	return (
    		<>
    			<canvas
    				className={styles.canvas}
    				ref={this.myRef}
    				onMouseMove={(e) => {
    					if (this.props.isDrawing) {
    						this.addPointToQueue(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    					}
    				}}
    				onMouseDown={(e) => {
    					this.start(e);
    				}}
    				onMouseUp={() => {
    					this.end();
    				}}
    			>
    			</canvas>
    		</>
    	);
    }

    private start = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    	const { offsetX, offsetY } = ev.nativeEvent;
    	this.clearQueue();
    	this.addPointToQueue(offsetX, offsetY);
    	this.props.changeDrawingState(true);
    	this.drawTick();
    };

    private end = () => {
    	this.props.changeDrawingState(false);
    	cancelAnimationFrame(this.animationFrameId!);
    };

    private drawTick = () => {
    	let throttle = 10;
    	if(!this.canvasContext || this.drawingQueue.length === 0) {
    		return;
    	}

    	if (this.drawingQueue.length - this.queueCounter > 1) {
    		this.canvasContext.beginPath();

    		if (this.queueCounter === 0) {
    			this.canvasContext.moveTo(this.drawingQueue[0][X], this.drawingQueue[0][Y]);
    		} else {
    			this.canvasContext.moveTo(this.drawingQueue[this.queueCounter - 1][X], this.drawingQueue[this.queueCounter - 1][Y]);
    		}

    		for (++this.queueCounter; --throttle >= 0 && this.queueCounter < this.drawingQueue.length; ++this.queueCounter) {
    			if (this.drawingQueue[(this.queueCounter + 1)]) {
    				const xc = (this.drawingQueue[this.queueCounter][X] + this.drawingQueue[this.queueCounter + 1][X] ?? 0) / 2;
    				const yc = (this.drawingQueue[this.queueCounter][Y] + this.drawingQueue[this.queueCounter + 1][Y] ?? 0) / 2;
    				this.canvasContext.quadraticCurveTo(this.drawingQueue[this.queueCounter][X], this.drawingQueue[this.queueCounter][Y], xc, yc);
    			} else {
    				this.canvasContext.lineTo(this.drawingQueue[this.queueCounter][X], this.drawingQueue[this.queueCounter][Y]);
    			}
    		}

    		this.canvasContext.stroke();
    	}

    	this.animationFrameId = requestAnimationFrame(this.drawTick);
    };

    private clearQueue = () => {
    	this.queueCounter = 0;
    	this.drawingQueue = [];
    };

    private addPointToQueue = (x: number, y: number) => {
    	this.drawingQueue.push([x, y]);
    };
}

function mapStateToProps(state: RootState): CanvasOwnProps {
	return {
		lineWidth: selectCanvasLineWidth(state),
		strokeStyle: selectCanvasStrokeStyle(state),
		isDrawing: selectCanvasDrawingState(state),
	};
}

const mapDispatchToProps = {
	changeLineWidth: changeCanvasLineWidth,
	changeStrokeStyle: changeCanvasStrokeStyle,
	changeDrawingState: changeCanvasDrawingState,
};

export const CanvasConnected = connect<CanvasOwnProps, CanvasDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(Canvas);
