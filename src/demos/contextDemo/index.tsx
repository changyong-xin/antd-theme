import { Button, message, notification } from 'antd';
import modal from 'antd/es/modal';
import React from 'react';
import { OriContext } from '../../lib';

export class OriContextDemo extends React.Component<any, any>{
    public render() {
        return (
            <div>
                <div>
                    <a href='https://ant.design/docs/react/customize-theme-cn#%E9%85%8D%E7%BD%AE%E4%B8%BB%E9%A2%98' target='_blank' rel="noreferrer">
                        Antd定制主题的特殊用法,如果直接使用message.info则不能使用主题变量
                    </a>
                </div>
                <div style={{ marginTop: 16 }} >能用主题的写法：</div>
                <div style={{ marginTop: 16 }} >
                    <Button onClick={() => {
                        OriContext.message.info('测试')
                    }}>
                        OriContext.message
                    </Button>
                    <Button onClick={() => {
                        OriContext.notification.info({ message: '测试' })
                    }}>
                        OriContext.notification
                    </Button>
                    <Button onClick={() => {
                        OriContext.modal.info({
                            title: '测试',
                            content: '窗口测试',
                            okText: '我知道了'
                        })
                    }}>
                        OriContext.modal
                    </Button>
                </div >
                <div style={{ marginTop: 16 }} >不能用主题的写法(当前红色主题应用了ConfigProvider.config的单独配置)：</div>
                <div style={{ marginTop: 16 }} >
                    <Button onClick={() => {
                        message.info('测试')
                    }}>
                        message
                    </Button>
                    <Button onClick={() => {
                        notification.info({ message: '测试' })
                    }}>
                        notification
                    </Button>
                    <Button onClick={() => {
                        modal.info({
                            title: '测试',
                            content: '窗口测试',
                            okText: '我知道了'
                        })
                    }}>
                        modal
                    </Button>
                </div >
                <div style={{ marginTop: 16 }} >在任意位置打开一个标签页：</div>
                <div style={{ marginTop: 16 }} >
                    <Button
                        onClick={() => {
                            // OriContext.modal.info({
                            //     title: '选择标签',
                            //     content: <Select>
                            //         {
                            //         createMenuMap(MainMenus).map.entries().next.
                            //         }
                            //     </Select>
                            // })
                            OriContext.openTab('0001')
                        }}
                    >
                        OriContext.openTab
                    </Button>
                </div>

            </div>
        )
    }

}