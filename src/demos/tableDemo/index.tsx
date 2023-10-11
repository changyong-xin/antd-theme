import React from 'react';
import { OriTable } from '../../lib';

export class OriTableDemo extends React.Component<any, any>{

    public render() {
        return (
            <>
                <div style={{ padding: '16px', height: "100%" }} >
                    <OriTable
                        
                        rowKey={'title'}
                        dataSource={[{ title: '456' }]}
                        columns={[{
                            dataIndex: "title",
                            title: 'Title',
                            width: 100
                        }]}
                    />
                </div>
            </>
        )
    }

}