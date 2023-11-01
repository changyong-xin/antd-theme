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

export function copyJson<T = any>(data: T): T {
    try {
        return data ? JSON.parse(JSON.stringify(data)) : data
    } catch (error) {
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


/**
 * 将请求的url添加上相对路径
 * @param url 
 * @returns 域名+路径+url
 */
export function wrapperUrl(url: string) {
    return window.location.origin + (window.location.pathname.replace('/index.html', '/') + url).replace('//', '/')
}
/**
 * 对针对Api的请求Url进行处理
 * @param url 
 * @returns 域名+服务路由（ServicePath）+url
 */
export function wrapperApi(url: string) {
    return window.location.origin + ((window.location.pathname.replace('/index.html', '/')).split('api')[0] + url).replace('//', '/')
}

// 节流与防抖的区别在于是立即执行还是延迟执行，
// 立即执行（在settimeout外执行）并阻断后续执行为节流，
// 延迟执行（在settimeout内执行）并阻断先前执行为防抖，

/** 节流-自定义时间 */
function throttling() {

    let isFinished: boolean = true;

    /** 节流-控制函数执行间隔-自定义时间(默认500ms) */
    return (fun: () => void, time?: number) => {

        if (isFinished === false) {
            return
        }
        isFinished = false;
        fun()
        setTimeout(() => {
            isFinished = true;
        }, time || 500);
    }
}


/** 防抖-自定义时间 */
function antishaking() {

    let timer: NodeJS.Timeout | undefined;

    /** 防抖-控制函数执行等待-自定义时间(默认500ms) */
    return (fun: () => void, time?: number) => {

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fun()
        }, time || 500);
    }
}

/** 节流-控制函数执行间隔-自定义时间(默认500ms) */
export const throttle = throttling()


/** 防抖-控制函数执行等待-自定义时间(默认500ms) */
export const antiShaking = antishaking()