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
	selectCanvasPointsToDraw,
	selectCanvasStrokeStyle,
	clearCanvasPointsToDraw, selectAuthorDrawing,
} from "../../store/canvasSettings";
import { ioTransport } from "../../io/ioInit";
import { selectMainDrawer } from "../../store/settings";

export interface CanvasOwnProps {
    strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
    lineWidth: number;
    isDrawing: boolean;
    externalPointsToDraw: [number, number][];
    isMainDrawer: boolean;
	authorDrawing: boolean;
}

export interface CanvasDispatchProps {
    changeLineWidth: typeof changeCanvasLineWidth;
    changeDrawingState: typeof changeCanvasDrawingState;
    changeStrokeStyle: typeof changeCanvasStrokeStyle;
    clearPointsToDraw: typeof clearCanvasPointsToDraw;
}

export type CanvasProps = CanvasOwnProps & CanvasDispatchProps;

export class Canvas extends React.Component<CanvasProps> {
    private readonly myRef;
    private canvasElement: HTMLCanvasElement | undefined;
    private canvasContext: CanvasRenderingContext2D | null | undefined;
    private drawingQueue: [number, number][] = [];
    private queueCounter = 0;
    private animationFrameId: number | null = null;
    private externalCounter = 0;
    private stopTicker = false;
    private firstExternalInput = false;
	private stopId: number | null = null;
	private flushPointsId: number | null = null;

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
    			this.canvasContext.lineJoin = "round";
    			this.canvasContext.strokeStyle = this.props.strokeStyle;
    			this.canvasContext.lineWidth = this.props.lineWidth;
    			this.canvasContext.translate(0.5, 0.5);
    		}
    	}
	}

	public shouldComponentUpdate(nextProps: Readonly<CanvasProps>): boolean {

    	if (this.props.authorDrawing === false && nextProps.authorDrawing === true) {
    		this.firstExternalInput = true;
    	}

    	if (this.canvasContext) {
    		this.canvasContext.lineWidth = this.props.lineWidth;
    		this.canvasContext.strokeStyle = this.props.strokeStyle;
    	}
		console.log(this.props.externalPointsToDraw !== nextProps.externalPointsToDraw
			&&
			nextProps.externalPointsToDraw.length > 0);
    	if (
    	this.props.externalPointsToDraw !== nextProps.externalPointsToDraw
    	&&
    		nextProps.externalPointsToDraw.length > 0
    	) {
			if (this.stopId) {
				window.clearTimeout(this.stopId);
			}
			if (this.flushPointsId) {
				window.clearTimeout(this.flushPointsId);
			}
    		const pointsToDraw = nextProps.externalPointsToDraw;
    		if (this.firstExternalInput) {
    			this.start({} as any, pointsToDraw[this.externalCounter], false);
    			this.externalCounter++;
    			this.firstExternalInput = false;
    		} else if (pointsToDraw[this.externalCounter]) {
    			this.stopTicker = false;
    			this.addPointToQueue(...(pointsToDraw[this.externalCounter] ?? pointsToDraw[this.externalCounter - 1]), false);
    			this.externalCounter++;
    		}

			this.stopId = window.setTimeout(() => this.stopLoop(), 500);
    	} else if (
			nextProps.externalPointsToDraw.length > 0
		) {
    		this.flushPointsId = window.setTimeout(() => {
    			this.props.clearPointsToDraw();
    			this.externalCounter = 0;
			}, 10000);
		}


    	return false;
	}

	public render() {
    	console.log("cnavas rerender");
    	return (
    		<>
    			<canvas
    				className={styles.canvas}
    				ref={this.myRef}
    				onMouseMove={(e) => {
    					if (this.props.isDrawing) {
    						// this.stopTicker = false;
    						this.addPointToQueue(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    					}
    				}}
    				onMouseDown={(e) => {
    					ioTransport.emit("mouseDownEvent");
    					this.start(e);
    				}}
    				onMouseUp={(e) => {
    					ioTransport.emit("mouseUpEvent");
    					this.end();
    				}}
    			>
    			</canvas>
    		</>
    	);
	}

    private start = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>, coordinates?: [number, number], shouldEmit = true) => {
    	this.stopTicker = false;
    	if (coordinates) {
    		this.clearQueue();
    		this.addPointToQueue(coordinates![0], coordinates![1], shouldEmit);
    	} else {
    		const { offsetX, offsetY } = ev.nativeEvent;
    		this.clearQueue();
    		this.addPointToQueue(offsetX, offsetY, shouldEmit);
    		this.props.changeDrawingState(true);
    	}

    	this.drawTick();
    };

    private end = () => {
    	this.props.changeDrawingState(false);
    	this.stopTicker = true;
    	cancelAnimationFrame(this.animationFrameId!);
    };

    private drawTick = () => {
    	let throttle = 100;
    	if(!this.canvasContext || this.stopTicker || this.drawingQueue.length === 0) {
    		this.canvasContext?.closePath();
    		return;
    	}
    	console.log("ticker", this.drawingQueue.length, this.queueCounter);

    	this.canvasContext.beginPath();
    	if (this.drawingQueue.length - this.queueCounter > 1) {

    		if (this.queueCounter === 0) {
    			this.canvasContext.moveTo(this.drawingQueue[0][X], this.drawingQueue[0][Y]);
    		} else {
    			this.canvasContext.moveTo(this.drawingQueue[this.queueCounter - 1][X], this.drawingQueue[this.queueCounter - 1][Y]);
    		}

    		for (++this.queueCounter; --throttle >= 0 && this.queueCounter < this.drawingQueue.length; ++this.queueCounter) {
    			// const isQuadraticCurve = false;
    			if (this.drawingQueue[(this.queueCounter + 1)]) {
    				const xc = (this.drawingQueue[this.queueCounter][X] + this.drawingQueue[this.queueCounter + 1][X] ?? 0) / 2;
    				const yc = (this.drawingQueue[this.queueCounter][Y] + this.drawingQueue[this.queueCounter + 1][Y] ?? 0) / 2;
    				this.canvasContext.quadraticCurveTo(this.drawingQueue[this.queueCounter][X], this.drawingQueue[this.queueCounter][Y], xc, yc);
    			} else {
    				this.canvasContext.lineTo(this.drawingQueue[this.queueCounter][X], this.drawingQueue[this.queueCounter][Y]);
    			}
    		}
    		console.log("STROKE");
    		this.canvasContext.stroke();
    	}

    	this.animationFrameId = requestAnimationFrame(this.drawTick);
    };

    private clearQueue = () => {
    	this.queueCounter = 0;
    	this.drawingQueue = [];
    };

    private stopLoop = () => {
    	this.stopTicker = true;
    };

    private addPointToQueue = (x: number, y: number, shouldEmit = true) => {
    	if (shouldEmit) {
    		ioTransport.emit("sendDraw", {
    			x,
    			y,
    		});
    	}
    	this.drawingQueue.push([x, y]);
    };
}

function mapStateToProps(state: RootState): CanvasOwnProps {
	return {
		lineWidth: selectCanvasLineWidth(state),
		strokeStyle: selectCanvasStrokeStyle(state),
		isDrawing: selectCanvasDrawingState(state),
		externalPointsToDraw: selectCanvasPointsToDraw(state),
		isMainDrawer: selectMainDrawer(state),
		authorDrawing: selectAuthorDrawing(state),
	};
}

const mapDispatchToProps: CanvasDispatchProps = {
	changeLineWidth: changeCanvasLineWidth,
	changeStrokeStyle: changeCanvasStrokeStyle,
	changeDrawingState: changeCanvasDrawingState,
	clearPointsToDraw: clearCanvasPointsToDraw,
};

export const CanvasConnected = connect<CanvasOwnProps, CanvasDispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(Canvas);
