import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { OridStore } from "..";


export interface ITabProps {
    OridStore: OridStore
}


export interface IMenuItem extends MenuItemType {
    children?: IMenuItem[];
    component?: React.ComponentClass<ITabProps> | React.FunctionComponent<ITabProps>;
}
