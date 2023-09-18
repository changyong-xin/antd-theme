import { FormOutlined, GroupOutlined, LayoutOutlined, TableOutlined } from "@ant-design/icons";
import { DateDemo, Demo1 } from "./demo1";
import { Demo2 } from "./demo2";
import { OriContextDemo } from "./contextDemo";
import { OriTable } from "./tableDemo";
import { TreeDemos } from "./treeDemo";
import { IMenuItem } from "../lib";
import { SearchFormDemo } from "./formDemo";

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
            { label: '查询表单', key: '0201', component: SearchFormDemo },
            { label: '编辑表单', key: '0202', component: DateDemo },
        ]
    },
    {
        label: '演示列表', icon: <GroupOutlined />, key: '03', children: [
            { label: 'OriContext', key: '0301', component: OriContextDemo },
            { label: '树形组件', key: '0302', component: TreeDemos },
        ]
    },
]