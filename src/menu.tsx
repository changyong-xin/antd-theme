import { FormOutlined, LayoutOutlined, TableOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import React from "react";
import { Demo1 } from "./demos/demo1";
import { Demo2 } from "./demos/demo2";
import { OriTable } from "./oriTable";

export class OridStoreClass {
    identity: string = '';
    constructor() {
        console.log('OridStoreClass  constructor')
    }
}

export interface ITabProps {
    OridStore: OridStoreClass
}


export interface IMenuItem extends MenuItemType {
    children?: IMenuItem[];
    component?: React.ComponentClass<ITabProps> | React.FunctionComponent<ITabProps>;
}

export const MainMenus: IMenuItem[] = [
    {
        label: '布局组件', icon: <LayoutOutlined />, key: '00', children: [
            { label: '通用布局', key: '0001', component: Demo1 },
            {
                label: '表格页面', key: '0002', component: Demo1, children: [
                    { label: '通用表格', key: '000201', component: Demo1 },
                    { label: '虚拟表格', key: '000202', component: Demo1 },
                ]
            },
        ]
    },
    {
        label: '表格组件', icon: <TableOutlined />, key: '01', children: [
            { label: '通用表格', key: '0101', component: OriTable },
            { label: '虚拟表格', key: '0102', component: Demo2 },
        ]
    },
    {
        label: '表单组件', icon: <FormOutlined />, key: '02', children: [
            { label: '查询表单', key: '0201', component: Demo1 },
            { label: '编辑表单', key: '0202', component: Demo1 },
        ]
    },
]