import { MenuItemType } from "antd/es/menu/hooks/useItems";

interface ITabProps {
    params: any
}


export interface IMenuItem extends MenuItemType {
    children?: IMenuItem[];
    component?: React.ComponentClass<ITabProps> | React.FunctionComponent<ITabProps>;
}
