import React from 'react';
import { copyJson } from '..';
import { OriFreeLayoutCell } from './cell';
import { IOriFreeLayoutCellContent, OriFreeLayoutGutter, OriFreeLayoutStatus } from './interface';

interface IOriFreeLayout {
    status: OriFreeLayoutStatus;
    items: IOriFreeLayoutCellContent[];
    contentRender: (config: IOriFreeLayoutCellContent, index: number) => React.ReactNode;
    onChange?: (items: IOriFreeLayoutCellContent[]) => void;
    gutter?: OriFreeLayoutGutter;
}

/**
 * 自由布局组件：
 * 
 * 子组件宽高可调整，位置可调整
 * 
 * 针对个性化要求高的界面，允许用户自定义内部组件大小及位置，容器大小建议设置为8的倍数
 * 
 */

export class OriFreeLayout extends React.Component<IOriFreeLayout, any>{


    private id: string = (Math.random() * 10000000).toFixed(0);

    private width: number = 0;

    private height: number = 0;

    private items: IOriFreeLayoutCellContent[];

    constructor(props: IOriFreeLayout) {
        super(props);
        this.items = copyJson(props.items)
    }

    public componentDidMount() {
        const client = document.getElementById('ori-freelayout-' + this.id)!;
        try {
            this.height = Math.ceil(client.clientHeight);
            this.width = Math.ceil(client.clientWidth);
        } catch (error) {
            console.log('无法获取视图大小')
        }
    }


    public render() {
        return (
            <div
                id={'ori-freelayout-' + this.id}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    width: '100%',
                }}
            >
                {
                    this.items.map((item, index) => <React.Fragment key={index}>
                        <OriFreeLayoutCell
                            name={item.name}
                            height={item.height}
                            width={item.width}
                            top={item.top}
                            left={item.left}
                            minWidth={item.minWidth}
                            minHeight={item.minHeight}
                            clientHeight={this.height}
                            clientWidth={this.width}
                            contents={this.items}
                            status={this.props.status}
                            gutter={this.props.gutter || 8}
                            onPositionChange={(top: number, left: number) => {
                                item.top = top;
                                item.left = left;
                                if (this.props.onChange) {
                                    this.props.onChange(this.items)
                                }
                            }}
                            onSizeChange={(width: number, height: number) => {
                                item.height = height;
                                item.width = width;
                            }}
                        >
                            {this.props.contentRender(item, index)}
                        </OriFreeLayoutCell>
                    </React.Fragment>
                    )
                }
            </div>
        )
    }


}

