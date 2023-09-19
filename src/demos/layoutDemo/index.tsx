import React from 'react';
import { OriLayout } from '../../lib';
import { Button, Card } from 'antd';
import { OriTableDemo } from '../tableDemo';
import { TableLayoutDemo } from './tableLayoutDemo';

export class LayoutDemo extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Card title='简单通用的一个表格（组合）组件' >
                    <div style={{ height: 400 }} >
                        <TableLayoutDemo />
                    </div>
                </Card>
                <Card title='测试' style={{ margin: '8px 0px' }} >
                    <div style={{ height: 400 }} >
                        <OriLayout
                            orientation='vertical'
                            topContent={<Button>新建</Button>}
                            middleContent={<OriTableDemo />}
                            middleStretch={true}
                        />
                    </div>
                </Card>
            </div>
        )
    }

}