import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';

interface IOriTable<T> {
    dataSource: T[];
}

export class OriTable<T extends AnyObject> extends React.Component<IOriTable<T>, any>{

    public render() {
        return (
            <Table<T>
                dataSource={this.props.dataSource}
            />
        )
    }

}