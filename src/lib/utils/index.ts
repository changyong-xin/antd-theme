import type { DataNode } from 'antd/es/tree';
import { IMenuItem } from '..';
import dayjs from 'dayjs';

interface ITreeData {
    children?: ITreeData[];
    Children?: ITreeData[];
}

/** 针对空字符串转换日期的时候会产生 Invalid Date 的问题，使用此方法进行转换(空字符串对应日期为null) */
export function dayjsTrans(dateStr?: string, format?: dayjs.OptionType) {
    if (dateStr && dateStr.length > 0) {
        return dayjs(dateStr, format)
    } else {
        return null
    }
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

    const map = new Map<React.Key, IMenuItem>();

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