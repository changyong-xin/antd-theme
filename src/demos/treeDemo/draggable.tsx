import { Tree } from 'antd';
import { DataNode, EventDataNode } from 'antd/es/tree';
import React from 'react';
import { copyObj } from '../../lib';
import { TreeData } from './common';

interface IDraggableTreeState {
    treeData: DataNode[]
}

export class DraggableTree extends React.Component<any, IDraggableTreeState>{

    private _drapNode?: DataNode;

    constructor(props: any) {
        super(props)
        this.state = {
            treeData: copyObj(TreeData)
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
                    console.log('drag info:', info)
                    this.dropHandler(this.state.treeData, info.dragNode, info.node, info.dropToGap)
                }}
                blockNode={true}
            />
        )
    }

    /**
     * 
     * @param treeData 原始数据
     * @param source 移动目标
     * @param target 目的地
     * @param dropToGap 在同级范围（兄弟节点之间移动）内切换位置
     */
    public dropHandler(treeData: DataNode[], source: EventDataNode<DataNode>, target: EventDataNode<DataNode>, dropToGap: boolean) {
        this._drapNode = undefined;
        const result = this.filterSource(treeData, source.key);
        if (result && this._drapNode) {
            this.setState({
                treeData: this.addTarget(result, this._drapNode, target, dropToGap)
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

    public addTarget(treeData: DataNode[], source: EventDataNode<DataNode>, target: EventDataNode<DataNode>, dropToGap: boolean): DataNode[] {
        const result: DataNode[] = []
        let findIndex: number | undefined;
        treeData.forEach((node, index) => {
            if (node.key === target.key) {
                if (dropToGap) {
                    findIndex = index
                } else {
                    node.children ? node.children.unshift(source) : node.children = [source]
                }
            } else {
                if (node.children && node.children.length > 0) {
                    node.children = this.addTarget(node.children, source, target, dropToGap);
                }
            }
            result.push(node)
        })
        // target.dragOverGapTop  是否移动到目的地上方（否则为下方）
        if (findIndex !== undefined) {
            result.splice(target.dragOverGapTop ? findIndex : findIndex + 1, 0, source)
        }
        return result
    }
}
