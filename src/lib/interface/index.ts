import { FormInstance } from "antd";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";

interface ITabProps {
    params: any
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