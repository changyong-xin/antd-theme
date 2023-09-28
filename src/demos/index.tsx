import { HomeOutlined } from '@ant-design/icons';
import { App, Button, ConfigProvider, FloatButton, Input } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { useEffect, useState } from 'react';
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

function DemoIndex() {
    const [primaryColor, setColor] = useState<string>('orange');
    useEffect(() => {
        OriContext.primaryColor = primaryColor
    })
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
            <FloatButton style={{ display: 'none' }} tooltip={<ThemeSetting onOk={setColor} />} />
            <AppWrapper />
            <OriMainLayout
                menu={createMenuMap(MainMenus)}
                default={{
                    key: '-1',
                    label: <div style={{ textAlign: 'center', width: '40px' }} > <HomeOutlined style={{ margin: "0px" }} /></div>,
                    children: <div>
                        <div>
                            默认标签页
                        </div>
                    </div>,
                    closable: false
                }}
            />
        </ConfigProvider>
    );
}

export default DemoIndex;