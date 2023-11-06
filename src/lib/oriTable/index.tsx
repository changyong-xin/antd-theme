import { CaretUpOutlined } from '@ant-design/icons';
import { Button, Menu, Pagination, Popover, Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import React, { useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import { ICustomEdit, IOriPagination, IOriTable } from '../interface';
import { OriCustomColumn } from '../oriCustomColumn';
import { OriEmpty } from '../oriEmpty';
import { OriMiniLayout } from '../oriMiniLayout';
import './index.scss';

interface IOriResizableThProps {
    onResize?: (width: any) => void;
    width?: number;
    className: string;
    children?: React.ReactNode;
}

function OriResizableTh(props: IOriResizableThProps) {
    const [width, setWidth] = React.useState<number | undefined>(props.width);
    const [resizing, setResizing] = React.useState(false);
    return (
        <>
            <th {...props} style={resizing ? { display: "block", width: width, zIndex: 9 } : undefined}>
                {props.children}
                {
                    props.onResize && props.width ?
                        <Rnd
                            className='ori-resize-wrapper'
                            style={resizing ? { border: '1px solid' } : undefined}
                            onResize={(e, dir, elementRef, delta, position) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setWidth(props.width! + delta.width)
                            }}
                            onResizeStart={(e, dir, elementRef) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setResizing(true);
                            }}
                            onResizeStop={(e, dir, elementRef, delta, position) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setResizing(false);
                                props.onResize!(width)
                            }}
                            size={{
                                height: '100%',
                                width: width || '100%',
                            }}
                            resizeHandleStyles={{
                                left: { display: 'none' },
                                top: { display: 'none' },
                                topLeft: { display: 'none' },
                                topRight: { display: 'none' },
                                bottom: { display: 'none' },
                                bottomLeft: { display: 'none' },
                                bottomRight: { display: 'none' },
                            }}
                            resizeHandleClasses={{
                                right: resizing ? 'ori-resize-resizing' : 'ori-resize-handle'
                            }}
                            minWidth={50}
                            disableDragging={true}
                        />
                        :
                        <></>
                }
            </th>
        </>
    )
}


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
                if (item.dataIndex) {
                    renderRef.current.set(String(item.dataIndex), item.render)
                }
                return {
                    title: String(item.title),
                    dataIndex: String(item.dataIndex),
                    width: typeof (item.width) === 'string' ? Number(item.width.split('px')[0]) : item.width,
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
                        const changeResult: ICustomEdit[] = columns.map((col: ColumnType<T>) => {
                            if (!Array.isArray(sorter) && col.dataIndex === sorter.field) {
                                col.sortOrder = sorter.order;
                            } else {
                                col.sortOrder = undefined;
                            }
                            return {
                                title: String(col.title),
                                dataIndex: String(col.dataIndex),
                                width: typeof (col.width) === 'string' ? Number(col.width.split('px')[0]) : col.width,
                                className: col.className,
                                fixed: col.fixed,
                                sorter: typeof (col.sorter) === 'boolean' ? col.sorter : false,
                                sortOrder: col.sortOrder,
                            }
                        });
                        if (props.custom && props.custom.onChange) {
                            props.custom.onChange(changeResult)
                        }
                        setColumns(changeResult)
                    }}
                    rowKey={props.rowKey}
                    dataSource={props.dataSource}
                    size='small'
                    components={{
                        header: {
                            cell: OriResizableTh
                        }
                    }}
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
                                                const resetResult: ICustomEdit[] = props.columns.map((item: ColumnType<T>) => {
                                                    if (item.dataIndex) {
                                                        renderRef.current.set(String(item.dataIndex), item.render)
                                                    }
                                                    return {
                                                        title: String(item.title),
                                                        dataIndex: String(item.dataIndex),
                                                        width: typeof (item.width) === 'string' ? Number(item.width.split('px')[0]) : item.width,
                                                        className: item.className,
                                                        fixed: item.fixed,
                                                        sorter: typeof (item.sorter) === 'boolean' ? item.sorter : false,
                                                        sortOrder: item.sortOrder,
                                                    }
                                                })
                                                if (props.custom && props.custom.onChange) {
                                                    props.custom.onChange(resetResult)
                                                }
                                                setColumns(resetResult)
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
                                    render: renderRef.current.has(item.dataIndex) ? renderRef.current.get(item.dataIndex) : undefined,
                                    onHeaderCell: () => (
                                        {
                                            width: item.width,
                                            onResize: (width: any) => {
                                                const resizeResult = columns.map((col) => {
                                                    if (col.dataIndex === item.dataIndex) {
                                                        col.width = width
                                                    }
                                                    return col
                                                })
                                                if (props.custom && props.custom.onChange) {
                                                    props.custom.onChange(resizeResult)
                                                }
                                                setColumns(resizeResult)
                                            }
                                        }
                                    )
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