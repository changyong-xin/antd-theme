import React from 'react';
import { DraggableTree } from './draggable';
import { Card } from 'antd';

export class TreeDemos extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%' }}>
                <div><a href='https://ant.design/components/tree-cn#components-tree-demo-basic' target='_blank' rel="noreferrer">Antd 示例</a></div>
                <div style={{ paddingTop: 16 }}>
                    <Card
                        title='拖拽排序'
                        extra='拖拽某个节点并放置到特定的位置（请不要使用大量数据）'
                    >
                        <DraggableTree />
                    </Card>
                </div>
            </div>
        )
    }

}