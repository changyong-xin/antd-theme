import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import React from 'react';
import { Copy, StaticContext } from '../../lib';
import { TreeData } from './common';

interface IDraggableTreeState {
    treeData: DataNode[]
}

export class DraggableTree extends React.Component<any, IDraggableTreeState>{

    private _drapNode?: DataNode;

    constructor(props: any) {
        super(props)
        this.state = {
            treeData: Copy(TreeData)
        }
        this.dropHandler = this.dropHandler.bind(this);
    }

    public render() {
        return (
            <Tree
                defaultExpandAll={true}
                treeData={this.state.treeData}
                draggable={true}
                onDrop={(info) => {
                    if (info.dropToGap) {
                        StaticContext.message.info('层级变化可能无法恢复')
                    }
                    this.dropHandler(this.state.treeData, info.dragNode, info.node)
                }}
            />
        )
    }

    public dropHandler(treeData: DataNode[], source: DataNode, target: DataNode,) {
        this._drapNode = undefined;
        const result = this.filterSource(treeData, source.key);
        if (result && this._drapNode) {
            this.setState({
                treeData: this.addTarget(result, this._drapNode, target.key)
            }, () => {
                console.log(this.state.treeData)
            })
        }
    }

    public filterSource(treeData: DataNode[], sourceKey: string | number,): DataNode[] {
        const result: DataNode[] = []
        treeData.forEach((node) => {
            if (node.key !== sourceKey) {
                if (node.children && node.children.length > 0) {
                    node.children = this.filterSource(node.children, sourceKey);
                }
                result.push(node)
            } else {
                this._drapNode = node
            }
        })
        return result
    }

    public addTarget(treeData: DataNode[], source: DataNode, targetKey: string | number): DataNode[] {
        const result: DataNode[] = []
        let findIndex: number | undefined;
        treeData.forEach((node, index) => {
            if (node.key === targetKey) {
                findIndex = index
            } else {
                if (node.children && node.children.length > 0) {
                    node.children = this.addTarget(node.children, source, targetKey);
                }
            }
            result.push(node)
        })
        if (findIndex !== undefined) {
            result.splice(findIndex + 1, 0, source)
        }
        return result
    }
}
