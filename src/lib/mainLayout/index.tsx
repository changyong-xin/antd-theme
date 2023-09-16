import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { App, Button, Layout, Menu, Tabs, theme } from "antd";
import { Tab } from 'rc-tabs/lib/interface';
import React, { useReducer, useState } from "react";
import { IMenuItem } from "..";
import { OriContext } from '../oriContext';
import './index.css';


interface IMainRight {
    activeKey: string | undefined;
    tabs: Tab[];
    onTabChange: (activeKey: string, remove?: boolean) => void;
}

interface IMainLeft {
    menu: IMenuItem[];
    activeKey: string | undefined;
    onMenuChange: (activeKey: string) => void;
}

interface IMainState {
    activeKey?: string;
    tabs: Tab[];
}

interface IMainAction {
    type: 'active' | 'add' | 'remove';
    tab?: Tab;
    key?: string;

}

function Context() {
    const { message, notification, modal } = App.useApp();
    OriContext.message = message;
    OriContext.notification = notification;
    OriContext.modal = modal;
    return <></>
}

function AppWrapper() {
    return (
        <App>
            <Context />
        </App>
    )
}

function mainResucer(state: IMainState, action: IMainAction): IMainState {
    switch (action.type) {
        case 'active': return {
            ...state,
            activeKey: action.key ? action.key : state.activeKey
        };
        case 'add':
            return {
                tabs: action.tab ? [...state.tabs, action.tab] : state.tabs,
                activeKey: action.tab ? action.tab.key : state.activeKey
            };
        case 'remove':
            const nextState: IMainState = {
                tabs: [],
                activeKey: undefined,
            }
            state.tabs.forEach((tab, index) => {
                if (tab.key !== action.key) {
                    nextState.tabs.push(tab)
                } else {
                    nextState.activeKey = (action.key === state.activeKey && state.tabs[index - 1] !== undefined) ? state.tabs[index - 1].key : state.activeKey
                }
            })
            return nextState;
        default: return state;
    }
}

function MainLeft(props: IMainLeft) {
    const [collapsed, setCollapsed] = useState(false);
    return <>
        <Layout.Sider theme="light" collapsed={collapsed} style={{ borderRight: "1px solid #e9e9e9", boxShadow: '0px 0px 4px #e9e9e9' }}>
            <div style={{ padding: 16, textAlign: "center", fontWeight: 600, borderBottom: "1px solid #e9e9e9" }} >
                <span>LOGO</span>
            </div>
            <div style={{ height: 'calc(100% - 117px)' }} >
                <Menu
                    selectedKeys={[props.activeKey!]}
                    style={{ border: '0px' }}
                    onClick={(info) => {
                        props.onMenuChange(info.key)
                    }}
                    mode="inline"
                    items={props.menu}
                />
            </div>
            <div style={{ padding: 16, textAlign: "center", fontWeight: 600, borderTop: "1px solid #e9e9e9" }} >
                <Button
                    type="primary"
                    onClick={() => {
                        setCollapsed(!collapsed)
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined title="展开" /> : <MenuFoldOutlined title="收起" />}
                </Button>
            </div>
        </Layout.Sider>
    </>
}

function MainRight(props: IMainRight) {
    const { token } = theme.useToken()
    return <>
        <Layout.Content>
            <div className="ori-main-tabs" >
                <Tabs
                    hideAdd={true}
                    tabBarStyle={{ backgroundColor: token.colorPrimary }}
                    activeKey={props.activeKey}
                    onChange={props.onTabChange}
                    type="editable-card"
                    items={props.tabs}
                    onEdit={(e, action) => {
                        if (action === 'remove' && typeof (e) === 'string') {
                            props.onTabChange(e, true)
                        }
                    }}
                />
            </div>
        </Layout.Content>
    </>
}

export default function MainLayout(props: {
    default?: Tab,
    menu: {
        map: Map<string | number, IMenuItem>;
        menu: IMenuItem[];
    }
}) {

    const [state, dispatch] = useReducer(mainResucer, {
        activeKey: undefined,
        tabs: props.default ? [props.default] : [],
    })

    function openTab(key: string, params?: any) {
        if (state.tabs.find((tab) => tab.key === key)) {
            dispatch({
                type: 'active',
                key,
            })
        } else {
            const find = props.menu.map.get(key);
            if (find && find.component) {
                dispatch({
                    type: 'add',
                    tab: {
                        key: find.key.toString(),
                        label: find.label,
                        children: React.createElement(find.component, { params: params }),
                        closable: true
                    }
                })
            } else {
                OriContext.message.info('没有对应的菜单或者该菜单没有需要渲染的组件')
            }
        }
    }

    OriContext.openTab = openTab;

    return <>
        <Layout style={{ height: '100vh' }}>
            <AppWrapper />
            <MainLeft
                menu={props.menu.menu}
                activeKey={state.activeKey}
                onMenuChange={OriContext.openTab}
            />
            <MainRight
                activeKey={state.activeKey}
                onTabChange={(key, remove) => {
                    if (remove) {
                        dispatch({
                            type: 'remove',
                            key,
                        })
                    } else {
                        dispatch({
                            type: 'active',
                            key,
                        })
                    }
                }}
                tabs={state.tabs}
            />
        </Layout>
    </>
}