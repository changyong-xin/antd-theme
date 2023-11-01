import { Row } from 'antd';
import React from 'react';

interface IOriGrid<T> {
    /** 列数 */
    cols: number | number[];
    /** 数据源 */
    dataSource: T[];
    /** 渲染方法 */
    render: (data: T, colIndex: number) => JSX.Element;
    /** 行高 */
    rowHeight?: number | string;

    style?: React.CSSProperties;

    gridStyle?: React.CSSProperties;
}

/** 宫格 */
export class OriGrid<T> extends React.Component<IOriGrid<T>, any>{

    public render() {
        const rows: number[] = [];
        if (typeof (this.props.cols) === 'number') {
            for (let i = 0; i < Math.ceil(this.props.dataSource.length / this.props.cols); i++) {
                rows.push(i)
            }
        } else {
            this.props.cols.forEach((col) => rows.push(col))
        }
        return (
            <div className='Orid-GridLayout' style={this.props.style}>
                {
                    typeof (this.props.cols) === 'number' ?
                        rows.map((row, index) => this.getCols(index, Number(this.props.cols)))
                        :
                        rows.map((rowcol, index) => this.rowRender(rows, index))
                }
            </div>
        )
    }

    public getCols = (rowindex: number, cols: number): JSX.Element => {
        const startIndex = rowindex * cols;
        const endIndex = (rowindex + 1) * cols;
        const datas = this.props.dataSource.slice(startIndex, endIndex)
        return <Row key={rowindex} className='Orid-GridLayout-Row' style={{ height: this.props.rowHeight }} >
            {datas.map((data, index) => <div key={index} className='Orid-GridLayout-Grid' style={{ ...this.props.gridStyle, width: (100 / cols).toFixed(0) + '%' }} >{this.props.render(data, index)}</div>)}
        </Row>
    }


    public rowRender = (rows: number[], current: number): JSX.Element => {
        let startIndex: number = 0;
        let endIndex: number = 0;
        rows.forEach((row, index) => {
            if (index < current) {
                startIndex += row;
            } else if (index === current) {
                endIndex = startIndex + row
            }
        })
        const datas = this.props.dataSource.slice(startIndex, endIndex)
        return <Row key={current} className='Orid-GridLayout-Row' style={{ height: this.props.rowHeight }} >
            {datas.map((data, index) => <div key={index} className='Orid-GridLayout-Grid' style={{ ...this.props.gridStyle, width: (100 / (endIndex - startIndex)).toFixed(0) + '%' }} >{this.props.render(data, index)}</div>)}
        </Row>
    }

}