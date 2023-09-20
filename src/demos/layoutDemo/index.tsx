import { Card } from 'antd';
import React from 'react';
import { OriLayout } from '../../lib';

export class LayoutDemo extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Card title='上中下' style={{ margin: '8px 0px' }} >
                    <div style={{ height: 300 }} >
                        <OriLayout
                            orientation='vertical'
                            topContent={<div>上</div>}
                            middleContent={<div>中</div>}
                            middleStretch={true}
                            bottomContent={<div>下</div>}
                        />
                    </div>
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