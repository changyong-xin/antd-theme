import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Tabs, theme } from "antd";
import { Tab } from 'rc-tabs/lib/interface';
import React, { useReducer, useState } from "react";
import { IMenuItem, OridStore } from "..";
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

const store = new OridStore();

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

export default function MainLayout(props: { default?: Tab, menuList: IMenuItem[] }) {

    const [state, dispatch] = useReducer(mainResucer, {
        activeKey: undefined,
        tabs: props.default ? [props.default] : []
    })

    function activeTabsByMenuKey(data: IMenuItem[], key: string) {
        data.forEach((item) => {
            if (item.key === key && item.component) {
                dispatch({
                    type: 'add',
                    tab: {
                        key: item.key.toString(),
                        label: item.label,
                        children: React.createElement(item.component, { OridStore: store }),
                        closable: true
                    }
                })
            } else if (item.children && item.children.length > 0) {
                activeTabsByMenuKey(item.children, key);
            }
        })
    }

    return <>
        <Layout style={{ height: '100vh' }}>
            <MainLeft
                menu={props.menuList}
                activeKey={state.activeKey}
                onMenuChange={(key) => {
                    if (state.tabs.find((tab) => tab.key === key)) {
                        dispatch({
                            type: 'active',
                            key,
                        })
                    } else {
                        activeTabsByMenuKey(props.menuList, key);
                    }

                }}
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