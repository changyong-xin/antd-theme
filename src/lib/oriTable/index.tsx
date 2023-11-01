import { CaretUpOutlined } from '@ant-design/icons';
import { Button, Menu, Pagination, Popover, Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import { useRef, useState } from 'react';
import { ICustomEdit, IOriPagination, IOriTable } from '../interface';
import { OriCustomColumn } from '../oriCustomColumn';
import { OriEmpty } from '../oriEmpty';
import { OriMiniLayout } from '../oriMiniLayout';
import './index.scss';



function OriPagination(props: IOriPagination) {

    return (
        <div className='ori-pagination'>
            <div style={{ display: "flex", alignItems: "center" }}>
                {props.addOnBefore}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 8 }}>
                    总计:
                    <span style={{ fontWeight: 600, margin: '0px 8px' }}>
                        {props.total}
                    </span>
                    条
                </span>
                <Popover
                    placement='top'
                    content={<div>
                        <Menu
                            className='ori-pagination-menu'
                            theme='light'
                            selectedKeys={[String(props.size)]}
                            onSelect={(info) => {
                                props.onChange(1, Number(info.key))
                            }}
                            items={
                                [...[10, 20, 30, 50, 100, 200], ...(props.sizeConfig || [])].map((item) => {
                                    return {
                                        label: <span style={{ width: '40px' }}>{item}</span>,
                                        key: item.toString(),
                                    }
                                })
                            }

                        />
                    </div>
                    }
                >
                    <Button size="small" >
                        每页 <span style={{ width: '30px' }}> {props.size}</span> 条 <CaretUpOutlined />
                    </Button>
                </Popover>
                <Pagination
                    current={props.index}
                    onChange={props.onChange}
                    pageSize={props.size}
                    simple={true}
                    total={props.total}
                />
            </div>
        </div>
    )
}


export function OriTable<T extends AnyObject>(props: IOriTable<T>) {
    const renderRef = useRef<Map<string, any>>(new Map())
    const [columns, setColumns] = useState<ICustomEdit[]>(
        props.columns ?
            props.columns.map((item: ColumnType<T>) => {
                renderRef.current.set(String(item.dataIndex), item.render)
                return {
                    title: String(item.title),
                    dataIndex: String(item.dataIndex),
                    width: item.width,
                    className: item.className,
                    fixed: item.fixed,
                    sorter: typeof (item.sorter) === 'boolean' ? item.sorter : false,
                    sortOrder: item.sortOrder,
                }
            })
            :
            []
    )
    return (
        <OriMiniLayout
            orientation='vertical'
            first={
                <Table<T>
                    rowSelection={props.rowSelection}
                    onChange={(pagination, filters, sorter) => {
                        const customCols: ICustomEdit[] = [];
                        columns.forEach((col: ColumnType<T>) => {
                            if (!Array.isArray(sorter) && col.dataIndex === sorter.field) {
                                col.sortOrder = sorter.order;
                            } else {
                                col.sortOrder = undefined;
                            }
                            customCols.push({
                                title: String(col.title),
                                dataIndex: String(col.dataIndex),
                                width: col.width,
                                className: col.className,
                                fixed: col.fixed,
                                sorter: typeof (col.sorter) === 'boolean' ? col.sorter : false,
                                sortOrder: col.sortOrder,
                            })
                        })
                        if (props.custom && props.custom.onChange) {
                            props.custom.onChange(customCols)
                        }
                        setColumns(customCols)
                    }}
                    rowKey={props.rowKey}
                    dataSource={props.dataSource}
                    size='small'
                    className={
                        props.dataSource && props.dataSource.length > 0 ?
                            'ori-table'
                            :
                            'ori-table ori-table-empty'
                    }
                    columns={
                        [
                            ...(props.custom && props.columns ? [
                                {
                                    fixed: true,
                                    title:
                                        <OriCustomColumn
                                            onReset={() => {
                                                setColumns(
                                                    props.columns ?
                                                        props.columns.map((item: ColumnType<T>) => (
                                                            {
                                                                title: String(item.title),
                                                                dataIndex: String(item.dataIndex),
                                                                width: item.width,
                                                                className: item.className,
                                                                fixed: item.fixed,
                                                                sorter: typeof (item.sorter) === 'boolean' ? item.sorter : false,
                                                                sortOrder: item.sortOrder,
                                                            }
                                                        ))
                                                        :
                                                        []
                                                )
                                            }}
                                            columns={columns}
                                            onOk={(customCols) => {
                                                if (props.custom && props.custom.onChange) {
                                                    props.custom.onChange(customCols)
                                                }
                                                setColumns(customCols)
                                            }}
                                        />,
                                    render: props.custom.render,
                                    width: props.custom.width,
                                }
                            ] : []),
                            ...columns.map(
                                (item, index) => ({
                                    ...item,
                                    render: renderRef.current.has(item.dataIndex) ? renderRef.current.get(item.dataIndex) : undefined
                                })
                            ).filter(
                                (item) => item.className !== 'ori-table-hidden-col'
                            ),
                            {
                                className: 'ori-table-flex-col',
                                title: ''
                            },
                        ]
                    }
                    loading={props.loading}
                    locale={{
                        emptyText: typeof (props.loading) === 'object'
                            ?
                            (props.loading.spinning ? <></> : <OriEmpty />)
                            :
                            (props.loading ? <></> : <OriEmpty />)
                    }}
                    scroll={{ y: 'calc(100% - 39px)' }}
                    bordered={true}
                    pagination={false}
                />
            }
            second={
                props.pagination ? <OriPagination {...props.pagination} /> : <></>
            }
            stretch='first'
        />

    )

}