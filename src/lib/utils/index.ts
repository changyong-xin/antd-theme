import type { DataNode } from 'antd/es/tree';

interface ITreeData {
    children?: ITreeData[];
    Children?: ITreeData[];
}

export function TreeDataTrans<T extends ITreeData>(list: T[], itemTrans: (item: T) => DataNode): DataNode[] {
    const result: DataNode[] = [];
    list.forEach((item) => {
        if (item.Children && item.Children.length > 0) {
            result.push(...TreeDataTrans(item.Children as T[], itemTrans))
        } else if (item.children && item.children.length > 0) {
            result.push(...TreeDataTrans(item.children as T[], itemTrans))
        } else {
            result.push(itemTrans(item))
        }
    })
    return result
}

export function Copy<T = any>(data: T): T {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log('Copy error:', error)
        return data
    }
}