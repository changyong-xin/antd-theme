import { FormOutlined, GroupOutlined, LayoutOutlined, TableOutlined } from "@ant-design/icons";
import { IMenuItem } from "../lib";
import { OriContextDemo } from "./contextDemo";
import { DateDemo } from "./demo1";
import { Demo2 } from "./demo2";
import { SearchFormDemo } from "./formDemo";
import { LayoutDemo } from "./layoutDemo";
import { TableLayoutDemo } from "./layoutDemo/tableLayout";
import { OriTableDemo } from "./tableDemo";
import { TreeDemos } from "./treeDemo";

export const MainMenus: IMenuItem[] = [
    {
        label: '表格组件', icon: <TableOutlined />, key: '01', children: [
            { label: '通用表格', key: '0101', component: OriTableDemo },
            { label: '虚拟表格', key: '0102', component: Demo2 },
        ]
    },
    {
        label: '表单组件', icon: <FormOutlined />, key: '02', children: [
            { label: '查询表单', key: '0201', component: SearchFormDemo },
            { label: '编辑表单', key: '0202', component: DateDemo },
        ]
    },
    {
        label: '布局组件', icon: <LayoutOutlined />, key: '00', children: [
            { label: '通用布局', key: '0001', component: LayoutDemo },
            { label: '表格布局', key: '0002', component: TableLayoutDemo },
        ]
    },
    {
        label: '组件列表', icon: <GroupOutlined />, key: '03', children: [
            { label: '树形组件', key: '0302', component: TreeDemos },
        ]
    },
    { label: 'OriContext', key: '04', component: OriContextDemo },
    { label: 'OriUtils', key: '05', component: OriContextDemo },
]