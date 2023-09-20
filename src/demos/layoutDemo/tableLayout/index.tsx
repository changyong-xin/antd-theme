import { Card } from 'antd';
import React from 'react';
import { SimpleTableLayout } from './simpleTableLayout';

export class TableLayoutDemo extends React.Component<any, any>{

    public render() {
        return (
            <div style={{ height: '100%', overflowY: 'auto' }}>
                <Card title='简单通用的一个表格布局组件' >
                    <div style={{ height: 400 }} >
                        <SimpleTableLayout />
                    </div>
                </Card>
            </div>
        )
    }

}