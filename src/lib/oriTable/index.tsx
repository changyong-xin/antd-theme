import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import './index.scss';

interface IOriTable<T> extends TableProps<T> {

}

export class OriTable<T extends AnyObject> extends React.Component<IOriTable<T>, any>{

    public render() {
        const { className, columns, scroll, size, ...rest } = this.props
        return (
            <Table<T>
                size='small'
                className='ori-tablelayout-table'
                columns={columns}
                scroll={{ y: 'calc(100% - 39px)' }}
                bordered={true}
                {...rest}
            />
        )
    }

}