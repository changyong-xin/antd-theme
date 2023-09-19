import { FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

interface ITabProps<T extends AnyObject = any> {
    params: T
}

export interface IOridForm<T> {
    /** 获取表单实例对象（用于外部控制表单Api） */
    getFormInstance?: (form: FormInstance<T>) => void;
    /** 响应表单域的值变化 */
    onFieldsChange?: (name: string, value: any) => void;
}



export interface IMenuItem extends MenuItemType {
    children?: IMenuItem[];
    component?: React.ComponentClass<ITabProps> | React.FunctionComponent<ITabProps>;
}