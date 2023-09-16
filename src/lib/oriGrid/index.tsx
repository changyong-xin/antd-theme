import { Row } from 'antd';
import React from 'react';

interface IOriGrid<T> {
    /** 列数 */
    cols: number;
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
        for (let i = 0; i < Math.ceil(this.props.dataSource.length / (this.props.cols || 1)); i++) {
            rows.push(i)
        }
        return (
            <div className='ori-layout-grid' style={this.props.style}>
                {rows.map((data, index) => this.getCols(index))}
            </div>
        )
    }

    public getCols = (rowindex: number): JSX.Element => {
        const startIndex = rowindex * this.props.cols;
        const endIndex = (rowindex + 1) * this.props.cols;
        const datas = this.props.dataSource.slice(startIndex, endIndex)
        return <Row key={rowindex} className='ori-layout-grid-row' style={{ height: this.props.rowHeight }} >
            {
                datas.map((data, index) => <div key={index} style={{ ...this.props.gridStyle, width: (100 / this.props.cols).toFixed(0) + '%' }} >
                    {this.props.render(data, index)}
                </div>)
            }
        </Row>
    }
}