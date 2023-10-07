import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { OriEmpty } from '../oriEmpty';
import './index.scss';


export function OriTable<T extends AnyObject>(props: TableProps<T>) {
    const { className, columns, scroll, size, bordered, pagination, locale, ...rest } = props
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