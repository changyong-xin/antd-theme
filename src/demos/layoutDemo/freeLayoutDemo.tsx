import { Button, Card, Switch } from "antd";
import React, { useState } from "react";
import { OriContext, OriFreeLayout } from "../../lib";

const contents = [
    {
        name: 'Card1',
        height: 150,
        width: 200,
        top: 100,
        left: 100,
    },
    {
        name: 'Card2',
        height: 150,
        width: 200,
        top: 100,
        left: 400,
    },
    {
        name: 'Card3',
        height: 150,
        width: 200,
        top: 300,
        left: 100,
    },
]

export function OriFreeLayoutDemo(props: any) {

    const [status, setStatus] = useState<'edit' | 'view'>('view');

    return (
        <div style={{ padding: '16px', height: '100%' }} >
            <div style={{ lineHeight: '22px', height: '40px' }} >
                <span>{'浏览'}</span>
                <Switch
                    style={{ margin: "0px 8px" }}
                    defaultChecked={false}
                    onChange={(e) => {
                        setStatus(e ? 'edit' : 'view')
                    }}
                />
                <span>{'编辑'}</span>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                        OriContext.message.info('暂时无法通过状态进行重置，需要重新加载组件')
                    }}
                >重置</Button>
                <Button
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                        OriContext.message.info('获取onChange的结果保存即可')
                    }}
                >保存</Button>
            </div>
            <div style={{ width: '100%', height: 'calc(100% - 40px)', backgroundColor: (status === 'edit' ? '#e9e9e9' : 'transparent') }} >
                <OriFreeLayout
                    status={status}
                    items={contents}
                    onChange={(items) => console.log(JSON.stringify(items))}
                    contentRender={(config, index) => {
                        return <React.Fragment key={index}>
                            <Card
                                title={config.name}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <div>{'content of card-' + index}</div>
                            </Card>
                        </React.Fragment>
                    }}
                />

            </div>
        </div >
    )

}