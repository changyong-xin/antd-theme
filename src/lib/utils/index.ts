import type { DataNode } from 'antd/es/tree';
import { IMenuItem } from '..';

interface ITreeData {
    children?: ITreeData[];
    Children?: ITreeData[];
}

export function treeDataTrans<T extends ITreeData>(list: T[], itemTrans: (item: T) => DataNode): DataNode[] {
    const result: DataNode[] = [];
    list.forEach((item) => {
        if (item.Children && item.Children.length > 0) {
            result.push(...treeDataTrans(item.Children as T[], itemTrans))
        } else if (item.children && item.children.length > 0) {
            result.push(...treeDataTrans(item.children as T[], itemTrans))
        } else {
            result.push(itemTrans(item))
        }
    })
    return result
}

export function copyObj<T = any>(data: T): T {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        console.log('Copy error:', error)
        return data
    }
}

export function createMenuMap(menu: IMenuItem[]) {

    const map = new Map<string | number, IMenuItem>();

    function listToMap(data: IMenuItem[]) {
        data.forEach((item) => {
            if (item.children && item.children.length > 0) {
                listToMap(item.children);
            } else {
                map.set(item.key, item)
            }
        })
    }

    listToMap(menu)

    return { map, menu }

}