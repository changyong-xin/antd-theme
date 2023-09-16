import { HomeOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, FloatButton, Input } from 'antd';
import { useState } from 'react';
import { OriMainLayout, createMenuMap } from './lib';
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

function DemoIndex() {
    const [primaryColor, setColor] = useState<string>('purple');
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primaryColor,
                    colorInfo: primaryColor
                },
                components: {
                    Tabs: {
                        itemColor: 'white',
                    },
                }
            }}
        >
            <FloatButton tooltip={<ThemeSetting onOk={setColor} />} />
            <OriMainLayout
                menu={createMenuMap(MainMenus)}
                default={{
                    key: '-1',
                    label: <div style={{ textAlign: 'center', width: '40px' }} > <HomeOutlined style={{ margin: "0px" }} /></div>,
                    children: <div>默认标签页</div>,
                    closable: false
                }}
            />
        </ConfigProvider>
    );
}

export default DemoIndex;