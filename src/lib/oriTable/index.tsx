import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnType, ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { ICustomConfig, ICustomEdit } from '../interface';
import { OriCustomColumn } from '../oriCustomColumn';
import { OriEmpty } from '../oriEmpty';
import './index.scss';



interface IOriTable<T> extends TableProps<T> {
    customConfig?: ICustomConfig<T>
}

export function OriTable<T extends AnyObject>(props: IOriTable<T>) {
    const [columns, setColumns] = useState(props.columns || [])
    return (
        <Table<T>
            onChange={(pagination, filters, sorter) => {
                const cols: ColumnsType<T> = []
                const customCols: ICustomEdit[] = [];
                columns.forEach((col: ColumnType<T>) => {
                    if (!Array.isArray(sorter) && col.dataIndex === sorter.field) {
                        col.sortOrder = sorter.order;
                    } else {
                        col.sortOrder = undefined;
                    }
                    cols.push(col);
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
                setColumns(cols)
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
                            title: <OriCustomColumn
                                columns={columns}
                                onOk={
                                    (customCols) => {
                                        const cols: ColumnsType<T> = [];
                                        customCols.forEach((item) => {
                                            const co = columns.find((c: ColumnType<T>) => c.dataIndex === item.dataIndex);
                                            if (co) {
                                                cols.push(
                                                    Object.assign(co,
                                                        {
                                                            title: item.title,
                                                            dataIndex: item.dataIndex,
                                                            width: item.width,
                                                            className: item.className,
                                                            fixed: item.fixed,
                                                            sorter: item.sorter,
                                                            sortOrder: item.sortOrder,
                                                        })
                                                )
                                            }
                                        })
                                        if (props.customConfig && props.customConfig.onChange) {
                                            props.customConfig.onChange(customCols)
                                        }
                                        setColumns(cols)
                                    }
                                }
                            />,
                            render: props.customConfig.render,
                            width: props.customConfig.width,
                        }
                    ] : []),
                    ...columns.filter((item) => item.className !== 'ori-table-hidden-col'),
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