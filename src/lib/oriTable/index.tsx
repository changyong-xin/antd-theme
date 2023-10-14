import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { OriCustomColumn } from '../oriCustomColumn';
import { OriEmpty } from '../oriEmpty';
import './index.scss';

interface ICustomConfig<T> {
    onChange?: (columns?: ColumnsType<T>) => void;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    width: string | number;
}

interface IOriTable<T> extends TableProps<T> {
    customConfig?: ICustomConfig<T>
}

export function OriTable<T extends AnyObject>(props: IOriTable<T>) {
    const [columns, setColumns] = useState(props.columns)
    return (
        <Table<T>
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
                            title: <OriCustomColumn
                                columns={props.columns}
                                onOk={
                                    (columns) => {
                                        setColumns(columns)
                                        if (props.customConfig && props.customConfig.onChange) {
                                            props.customConfig.onChange(columns)
                                        }
                                    }
                                }
                            />,
                            render: props.customConfig.render,
                            width: props.customConfig.width,
                        }
                    ] : []),
                    ...(columns || []),
                    {
                        className: 'ori-table-flex-col',
                        title: ''
                    },
                ]
            }
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