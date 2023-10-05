import React from "react";
import { Rnd } from "react-rnd";
import { IOriFreeLayoutCellContent, IOriFreeLayoutCellProfile, OriFreeLayoutGutter, OriFreeLayoutStatus } from "./interface";
export declare type Direction = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';

interface IOriFreeLayoutCellState extends IOriFreeLayoutCellProfile {
    topLine: boolean;
    leftLine: boolean;
    rightLine: boolean;
    bottomLine: boolean;
    borderShow: boolean;
    before: IOriFreeLayoutCellProfile;
}

interface IOriFreeLayoutCell extends IOriFreeLayoutCellContent {
    contents: IOriFreeLayoutCellContent[];
    clientHeight: number,
    clientWidth: number;
    status: OriFreeLayoutStatus,
    gutter: OriFreeLayoutGutter,
    onSizeChange: (width: number, height: number) => void;
    onPositionChange: (top: number, left: number) => void;
    children?: React.ReactNode;
}

export class OriFreeLayoutCell extends React.Component<IOriFreeLayoutCell, IOriFreeLayoutCellState>{

    constructor(props: IOriFreeLayoutCell) {
        super(props);
        this.state = {
            topLine: false,
            leftLine: false,
            rightLine: false,
            bottomLine: false,
            left: props.left,
            top: props.top,
            width: props.width,
            height: props.height,
            borderShow: false,
            before: {
                left: props.left,
                top: props.top,
                width: props.width,
                height: props.height,
            }
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div style={{
                    position: 'absolute',
                    overflow: 'hidden',
                    left: this.state.before.left,
                    top: this.state.before.top,
                    width: this.state.before.width,
                    height: this.state.before.height,
                }} >
                    {this.props.children}
                </div>
                <Rnd
                    onDragStart={(e, data) => {
                        this.setState({
                            borderShow: true
                        })
                    }}
                    onResizeStart={(e, dir, elementRef) => {
                        this.setState({
                            borderShow: true
                        })
                    }}
                    position={{
                        x: this.state.left,
                        y: this.state.top
                    }}
                    size={{
                        height: this.state.height,
                        width: this.state.width
                    }}
                    minWidth={this.props.minWidth || 100}
                    maxWidth={this.props.clientWidth - 16}
                    minHeight={this.props.minHeight || 100}
                    maxHeight={this.props.clientHeight - 16}
                    disableDragging={this.props.status === 'view'}
                    enableResizing={this.props.status === 'edit'}
                    onDrag={(e, data) => {
                        this.onDrag(data.x, data.y)
                    }}
                    onDragStop={(e, data) => {
                        this.onDrag(data.x, data.y, true)
                    }}
                    onResize={(e, dir, elementRef, delta, position) => {
                        this.onSizeChange(dir, elementRef.clientWidth, elementRef.clientHeight, position.y, position.x)
                    }}
                    onResizeStop={(e, dir, elementRef, delta, position) => {
                        this.onSizeChange(dir, elementRef.clientWidth, elementRef.clientHeight, position.y, position.x, true)
                    }}
                >
                    <div className="cell-drag-frame" style={{ height: '100%', width: '100%', border: "2px solid", borderColor: this.state.borderShow ? "#999" : "transparent" }} />
                </Rnd >
            </React.Fragment>
        )
    }


    public onDrag = (left: number, top: number, stoped?: boolean) => {
        // console.log('drag')
        let leftLine = false;
        let topLine = false;
        let leftResult = left < 8 ? 8 : left;
        let topResult = top < 8 ? 8 : top;
        if (stoped) {
            this.props.contents.forEach((item, index) => {
                if (item.name === this.props.name) {
                    return
                } else {
                    if (Math.abs(item.left - left) < 8) {
                        leftResult = item.left
                    }
                    if (Math.abs(item.top - top) < 8) {
                        topResult = item.top
                    }
                    if (Math.abs(item.left + item.width - left) < this.props.gutter) {
                        leftResult = item.left + item.width + this.props.gutter;
                    }
                    if (Math.abs(item.top + item.height - top) < this.props.gutter) {
                        topResult = item.top + item.height + this.props.gutter;
                    }
                }
            })
        } else {
            this.props.contents.forEach((item, index) => {
                if (item.name === this.props.name) {
                    return
                } else {
                    if (item.left === left) {
                        leftLine = true
                    }
                    if (item.top === top) {
                        topLine = true
                    }
                }
            })
        }
        this.setState({
            leftLine,
            topLine,
            left: leftResult,
            top: topResult,
            borderShow: !stoped,
            before: {
                left: stoped ? leftResult : this.state.before.left,
                top: stoped ? topResult : this.state.before.top,
                width: this.state.before.width,
                height: this.state.before.height,
            }
        }, () => {
            if (stoped) {
                this.props.onPositionChange(topResult, leftResult)
            }
        })
    }

    public onSizeChange = (dir: Direction, width: number, height: number, top: number, left: number, stoped?: boolean) => {
        // console.log(dir)
        let rightLine = false;
        let bottomLine = false;
        let leftLine = false;
        let topLine = false;
        let widthResult = left < 8 ? width + left - 8 : width;
        let heightResult = top < 8 ? height + top - 8 : height;
        let leftResult = left < 8 ? 8 : left;
        let topResult = top < 8 ? 8 : top;
        const right = left + width;
        const bottom = top + height;
        if (stoped) {
            this.props.contents.forEach((item, index) => {
                const itemBottom = item.top + item.height;
                const itemRight = item.left + item.width;
                if (item.name === this.props.name) {
                    return
                } else {
                    if ((dir === 'right' || dir === 'bottomRight') && Math.abs(itemRight - right) < 8) {
                        widthResult = itemRight - right + width
                    }
                    if ((dir === 'right' || dir === 'bottomRight') && Math.abs(item.left - right) < this.props.gutter) {
                        widthResult = item.left - left - this.props.gutter
                    }
                    if (dir.includes('bottom') && Math.abs(itemBottom - bottom) < 8) {
                        heightResult = itemBottom - bottom + height
                    }
                    if (dir.includes('bottom') && Math.abs(item.top - bottom) < this.props.gutter) {
                        heightResult = item.top - top - this.props.gutter
                    }
                    if ((dir === 'left' || dir === 'bottomLeft') && Math.abs(item.left - left) < 8) {
                        leftResult = item.left;
                        widthResult = right - item.left;
                    }
                    if ((dir === 'left' || dir === 'bottomLeft') && Math.abs(itemRight - left) < this.props.gutter) {
                        leftResult = itemRight + this.props.gutter;
                        widthResult = right - itemRight - + this.props.gutter;
                    }
                    if (dir.includes('top') && Math.abs(item.top - top) < 8) {
                        topResult = item.top;
                        heightResult = bottom - item.top;
                    }
                    if (dir.includes('top') && Math.abs(itemBottom - top) < this.props.gutter) {
                        topResult = itemBottom + this.props.gutter;
                        heightResult = bottom - itemBottom - this.props.gutter;
                    }
                }
            })
        } else {
            this.props.contents.forEach((item, index) => {
                const itemRight = item.left + item.width;
                const itemBottom = item.top + item.height;
                if (item.name === this.props.name) {
                    return
                } else {
                    if (itemRight === right) {
                        rightLine = true
                    }
                    if (itemBottom === bottom) {
                        bottomLine = true
                    }
                    if (item.left === left) {
                        leftLine = true
                    }
                    if (item.top === top) {
                        topLine = true
                    }
                }
            })
        }
        this.setState({
            rightLine,
            bottomLine,
            leftLine,
            topLine,
            width: widthResult,
            height: heightResult,
            left: leftResult,
            top: topResult,
            borderShow: !stoped,
            before: {
                left: stoped ? leftResult : this.state.before.left,
                top: stoped ? topResult : this.state.before.top,
                width: stoped ? widthResult : this.state.before.width,
                height: stoped ? heightResult : this.state.before.height,
            }
        }, () => {
            if (stoped) {
                this.props.onPositionChange(topResult, leftResult);
                this.props.onSizeChange(widthResult, heightResult);
            }
        })
    }
}
