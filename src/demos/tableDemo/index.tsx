import React from 'react';
import { OriTable } from '../../lib';

export class OriTableDemo extends React.Component<any, any>{

    public render() {
        return (
            <>
                <div style={{ padding: '16px', height: "100%" }} >
                    <OriTable
                        customConfig={
                            {
                                width: '80px',
                                render: (value, record, index) => <span>{index + 1}</span>,
                            }
                        }
                        rowKey={'title'}
                        dataSource={[
                            { title: '1' },
                            { title: '2' },
                            { title: '3' },
                            { title: '4' },
                            { title: '5' }
                        ]}
                        columns={[
                            {
                                dataIndex: "title",
                                title: 'TitleTitleTitleTitle',
                                width: 100,
                                sorter: true,
                                sortOrder: 'ascend'
                            },
                            {
                                dataIndex: "description",
                                title: 'Description',
                                width: 120,
                            },
                            {
                                dataIndex: "tooltip",
                                title: 'Tooltip',
                                width: 150,
                                sorter: true,
                                sortOrder: 'descend'
                            },
                            {
                                dataIndex: "label",
                                title: 'Label',
                                width: 80,
                                sorter: true,
                            }
                        ]}
                    />
                </div>
            </>
        )
    }

}