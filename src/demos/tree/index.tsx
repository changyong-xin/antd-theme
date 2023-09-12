import React from 'react';
import { DraggableTree } from './draggable';

export class TreeDemos extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%' }}>
                <div><a href='https://ant.design/components/tree-cn#components-tree-demo-basic' target='_blank' rel="noreferrer">Antd 示例</a></div>
                <div>
                    <DraggableTree />
                </div>
            </div>
        )
    }

}