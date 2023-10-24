import { FormOutlined, GroupOutlined, LayoutOutlined, TableOutlined } from "@ant-design/icons";
import { IMenuItem } from "../lib";
import { OriContextDemo } from "./contextDemo";
import { Demo } from "./demo";
import { SearchFormDemo } from "./formDemo";
import { HooksDemo } from "./hooksDemo";
import { LayoutDemo } from "./layoutDemo";
import { OriFreeLayoutDemo } from "./layoutDemo/freeLayoutDemo";
import { ListDemo } from "./listDemo";
import { SelectDemo } from "./selectDemo";
import { OriTableDemo } from "./tableDemo";
import { TreeDemos } from "./treeDemo";

export const MainMenus: IMenuItem[] = [
    {
        label: 'Hooks使用', key: '0000', component: HooksDemo
    },
    { label: 'Context', key: '04', component: OriContextDemo },
    { label: 'Utils', key: '05', component: OriContextDemo },
    {
        label: '表单组件', icon: <FormOutlined />, key: '02', children: [
            { label: '查询表单', key: '0201', component: SearchFormDemo },
            { label: '编辑表单', key: '0202', component: Demo },
        ]
    },
    {
        label: '布局组件', icon: <LayoutOutlined />, key: '00', children: [
            { label: '通用布局', key: '0001', component: LayoutDemo },
            { label: '自由布局', key: '0002', component: OriFreeLayoutDemo },
        ]
    },
    {
        label: '表格组件', icon: <TableOutlined />, key: '01', children: [
            { label: '通用表格', key: '0101', component: OriTableDemo },
            { label: '虚拟表格', key: '0102', component: Demo },
        ]
    },
    {
        label: '组件列表', icon: <GroupOutlined />, key: '03', children: [
            { label: '树形组件', key: '0302', component: TreeDemos },
            { label: '选择组件', key: '0303', component: SelectDemo },
            { label: '可拖拽列表', key: '0304', component: ListDemo },
        ]
    },

]