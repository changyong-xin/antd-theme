import { UserOutlined } from '@ant-design/icons';
import { App, Avatar, Badge, Button, ConfigProvider, Dropdown, FloatButton, Input } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import { OriContext, OriMainLayout, createMenuMap } from '../lib';
import { MainMenus } from './menu';

function ThemeSetting(props: { onOk: (color: string) => void }) {
    const [value, setValue] = useState<string>()
    return <div style={{ display: 'flex' }} >
        <Input
            id='color-input'
            title='主题色'
            onChange={(e) => {
                setValue(e.target.value)
            }}
            value={value}
            placeholder='请输入主题颜色'
            style={{ marginRight: 16 }}
        />
        <Button
            onClick={() => {
                props.onOk(value || '#0189ff')
            }}
            type='primary'>
            变更主题色
        </Button>
    </div>

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

function MainExtra() {
    const [dot, setDot] = useState(true)
    return (
        <div style={{ marginRight: '16px', lineHeight: '40px' }}>
            <Dropdown
                menu={
                    {
                        items: [
                            { key: '1', label: '个人中心' },
                            { key: '2', label: <Badge dot={dot} >{'消息列表'}</Badge> }
                        ],
                        onClick: (info) => {
                            if (info.key === '2') {
                                setDot(false)
                            }
                        }
                    }
                }
            >
                <Badge dot={dot} >
                    <Avatar shape="circle" size={28} icon={<UserOutlined />} />
                </Badge>
            </Dropdown>
        </div>
    )
}

function DemoIndex() {
    const [primaryColor, setColor] = useState<string>('orange');
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: primaryColor,
                    colorInfo: primaryColor,
                },
                components: {
                    Tabs: {
                        itemColor: 'white',
                    },
                    Table: {
                        headerBorderRadius: 0
                    }
                }
            }}
        >
            <FloatButton  tooltip={<ThemeSetting onOk={setColor} />} />
            <AppWrapper />
            <OriMainLayout
                menu={createMenuMap(MainMenus)}
                default={<div>默认标签页</div>}
                tabBarExtraContent={<MainExtra />}
            />
        </ConfigProvider>
    );
}

export default DemoIndex;