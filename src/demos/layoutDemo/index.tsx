import { Card, Switch } from 'antd';
import React, { useState } from 'react';
import { OriLayout } from '../../lib';

function VerticalLayout() {
    const [topStretch, setTopStretch] = useState(true);
    const [middleStretch, setMiddleStretch] = useState(true);
    const [bottomStretch, setBottomStretch] = useState(true);
    return <div style={{ height: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
            <span style={{ margin: '0px 8px' }} >上</span>
            <Switch checked={topStretch} onChange={() => setTopStretch(!topStretch)} />
            <span style={{ margin: '0px 8px' }} >中</span>
            <Switch checked={middleStretch} onChange={() => setMiddleStretch(!middleStretch)} />
            <span style={{ margin: '0px 8px' }} >下</span>
            <Switch checked={bottomStretch} onChange={() => setBottomStretch(!bottomStretch)} />
        </div>
        <OriLayout
            orientation='vertical'
            topContent={<div>上</div>}
            topStretch={topStretch}
            middleContent={<div>中</div>}
            middleStretch={middleStretch}
            bottomContent={<div>下</div>}
            bottomStretch={bottomStretch}
        />
    </div>
}

export class LayoutDemo extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Card title='上中下' style={{ margin: '8px 0px' }} >
                    <VerticalLayout />
                </Card>
                <Card title='左中右' style={{ margin: '8px 0px' }} >
                    <div style={{ height: 300 }} >
                        <OriLayout
                            orientation='horizontal'
                            leftContent={<div>左</div>}
                            middleContent={<div>中</div>}
                            middleStretch={true}
                            rightContent={<div>右</div>}
                        />
                    </div>
                </Card>
            </div>
        )
    }

}