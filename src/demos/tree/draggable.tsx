import { Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import React from 'react';
import { Copy } from '../../lib';
import { TreeData } from './common';

interface IDraggableTreeState {
    treeData: DataNode[]
}

export class DraggableTree extends React.Component<any, IDraggableTreeState>{

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
                    console.log(info)
                    console.log(this.dropHandler(this.state.treeData, info.dragNode, info.node))
                    // this.setState({
                    //     treeData: this.dropHandler(this.state.treeData, info.dragNode, info.node)
                    // })
                }}
            />
        )
    }

    public dropHandler(treeData: DataNode[], source: DataNode, target: DataNode, father?: DataNode): DataNode[] {
        const result: DataNode[] = []
        treeData.forEach((item) => {
            if (item.children && item.children.length > 0) {
                item.children = this.dropHandler(item.children, source, target, item)
                result.push(item)
            } else {
                if (item.key === target.key) {
                    console.log(father)
                    if (father) {
                        if (father.children) {
                            father.children.push(source)
                        } else {
                            father['children'] = [source]
                        }
                        console.log(father.children.length)
                        result.push(...father.children)
                    } else {
                        result.push(...treeData, source)
                    }
                } else if (item.key !== source.key) {
                    result.push(item)
                } else if (item.children && item.children.length > 0) {
                    item.children = this.dropHandler(item.children, source, target, item)
                    result.push(item)
                }
            }
        })
        console.log('---')
        result.forEach((item) => {
            console.log(item.key)
        })
        console.log('---')
        return result
    }
}
