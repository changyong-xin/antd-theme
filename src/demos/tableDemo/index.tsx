import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { theme } from 'antd';
import React from 'react';
import { OriTable } from '../../lib';

export function OriTableDemo() {
    const token = theme.useToken();
    const [rowkeys, setRowKeys] = React.useState<React.Key[] | undefined>([])
    return (
        <>
            <div style={{ padding: '16px', height: "100%" }} >
                <OriTable
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows, info) => {
                            setRowKeys(selectedRowKeys)
                        },
                        selectedRowKeys: rowkeys
                    }}
                    pagination={
                        {
                            addOnBefore:
                                <div className='ori-flex-row'>
                                    <ExclamationCircleTwoTone twoToneColor={token.token.colorPrimary} style={{ marginRight: '8px' }} />
                                    <span>已选择</span>
                                    <span style={{ margin: '0px 8px' }}>{rowkeys ? rowkeys.length : 0}</span>
                                    <span>项</span>
                                </div>,
                            size: 20,
                            total: 5,
                            index: 1,
                            onChange: (index, size) => { console.log(index, size) }
                        }
                    }
                    custom={
                        {
                            width: '60px',
                            render: (value, record, index) => <span>{index + 1}</span>,
                            onChange: (columns) => console.log(columns)
                        }
                    }
                    rowKey={'title'}
                    dataSource={[
                        { title: '1' },
                        { title: '2' },
                        { title: '3' },
                        { title: '4' },
                        { title: '5' },
                        { title: '11' },
                        { title: '22' },
                        { title: '33' },
                        { title: '44' },
                        { title: '55' },
                        { title: '111' },
                        { title: '222' },
                        { title: '333' },
                        { title: '444' },
                        { title: '555' },
                        { title: '1111' },
                        { title: '2222' },
                        { title: '3333' },
                        { title: '4444' },
                        { title: '5555' }
                    ]}
                    columns={[
                        {
                            dataIndex: "title",
                            title: 'TitleTitleTitleTitleTitleTitleTitleTitle',
                            width: 100,
                            sorter: true,
                            sortOrder: 'ascend'
                        },
                        {
                            dataIndex: "description",
                            title: 'Description',
                            width: 120,
                            render: (value, record, index) => <span>{index + 'd'}</span>
                        },
                        {
                            dataIndex: "tooltip",
                            title: 'Tooltip',
                            width: 150,
                            sorter: true,
                            sortOrder: 'descend',
                            render: (value, record, index) => <span>{index + 't'}</span>
                        },
                        {
                            dataIndex: "label",
                            title: 'Label',
                            width: 80,
                            sorter: true,
                            render: (value, record, index) => <span>{index + 'l'}</span>
                        }
                    ]}
                />
            </div>
        </>
    )
}