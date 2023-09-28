import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { OriEmpty } from '../oriEmpty';
import './index.scss';


export function OriTable<T extends AnyObject>(props: TableProps<T>) {
    const { className, columns, scroll, size, ...rest } = props
    return (
        <Table<T>
            {...rest}
            size='small'
            className={
                props.dataSource && props.dataSource.length > 0 ?
                    'ori-table'
                    :
                    'ori-table ori-table-empty'
            }
            columns={columns}
            locale={{
                emptyText: props.loading ? <></> : <OriEmpty />
            }}
            scroll={{ y: 'calc(100% - 39px)' }}
            bordered={true}
            pagination={false}
        />
    )

}