import { AnyObject } from "antd/es/_util/type";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

interface ITabProps<T extends AnyObject = any> {
    params: T
}

import { FormInstance } from "antd";


export interface ICustomConfig<T> {
    onChange?: (columns?: ICustomEdit[]) => void;
    render: (value: any, record: T, index: number) => React.ReactNode;
    width: string | number;
}

export interface IMenuItem extends MenuItemType {
    children?: IMenuItem[];
    component?: React.ComponentClass<ITabProps> | React.FunctionComponent<ITabProps>;
}

export interface IOriForm<T> {
    /** 获取表单实例对象（用于外部控制表单Api） */
    getFormInstance?: (form: FormInstance<T>) => void;
    /** 响应表单域的值变化 */
    onFieldsChange?: (name: keyof T, value: any) => void;
}


export declare type ValueInput = 'input' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYYMM' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss';

export declare type FieldVlaue = React.Key | [React.Key, React.Key] | React.Key[];

export interface IOriSearchFormField<T = AnyObject> {
    name: keyof T;
    /** 中文描述 */
    description: string;
    /** 是否是区间查询 */
    isRange?: boolean;
    /** 初始值 */
    initialValue?: FieldVlaue;
    /** 输入组件的类型，从默认类型中选择或直接使用自定义组件，注意：需要实现接口的value及onChange */
    valueInput?: ValueInput | React.ReactNode
    allowClear?: boolean;
    width?: number;
}

export interface ICustomEdit {
    className?: string;
    fixed?: 'left' | 'right' | boolean;
    dataIndex: string;
    title: string;
    width?: string | number;
    sorter?: boolean;
    sortOrder?: 'ascend' | 'descend' | null
}