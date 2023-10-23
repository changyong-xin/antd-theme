import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType } from 'antd/es/table';
import { useRef, useState } from 'react';
import { ICustomConfig, ICustomEdit } from '../interface';
import { OriCustomColumn } from '../oriCustomColumn';
import { OriEmpty } from '../oriEmpty';
import './index.scss';



interface IOriTable<T> extends TableProps<T> {
    customConfig?: ICustomConfig<T>
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
        <Table<T>
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
                if (props.customConfig && props.customConfig.onChange) {
                    props.customConfig.onChange(customCols)
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
                    ...(props.customConfig && props.columns ? [
                        {
                            fixed: true,
                            title:
                                <OriCustomColumn
                                    onReset={() => {
                                        console.log(props.columns);
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
                                    onOk={(customCols) => setColumns(customCols)}
                                />,
                            render: props.customConfig.render,
                            width: props.customConfig.width,
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
    )

}