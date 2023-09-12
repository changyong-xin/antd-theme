import { HomeOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, FloatButton, Input } from 'antd';
import { useState } from 'react';
import { MainLayout } from './lib';
import { MainMenus } from './menu';

function AntdComponets() {
    const [value, setValue] = useState<string>()
    const [primaryColor, setColor] = useState<string>('purple')
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: primaryColor,
                },
                components: {
                    Tabs: {
                        cardBg: 'rgba(202,202,202,0.5)',
                    }
                }
            }}
        >
            <FloatButton
                tooltip={
                    <div style={{ display: 'flex' }} >
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
                                setColor(value || 'orange')
                            }}
                            type='primary'>
                            变更主题色
                        </Button>
                    </div>

                } />
            <MainLayout
                menuList={MainMenus}
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

export default AntdComponets;