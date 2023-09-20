import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import './index.scss';

interface IOriTable<T> extends TableProps<T> {

}

export class OriTable<T extends AnyObject> extends React.Component<IOriTable<T>, any>{

    public render() {
        const { className, columns, scroll, ...rest } = this.props
        return (
            <Table<T>
                className='ori-tablelayout-table'
                columns={columns}
                scroll={{ y: 'calc(100% - 55px)' }}
                bordered={true}
                {...rest}
            />
        )
    }

}