import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { makeObservable, observable } from 'mobx';
import React from 'react';
import { OriLayout } from '../oriLayout';
import { OriPagination } from '../oriPagination';
import './index.scss';

export class OriTableLayoutUiStore<T>{

    constructor() {
        makeObservable(this, {
            dataSource: observable,
            loading: observable,
            pageIndex: observable,
            pageSize: observable,
            selectedRowKeys: observable,
            totalCount: observable,
        })
    }

    public dataSource: T[] = [];

    public loading: boolean = false;

    public pageIndex: number = 0;

    public pageSize: number = 20;

    public selectedRowKeys: string[] = [];

    public totalCount: number = 123456;

}


export abstract class OriTableLayout<T extends AnyObject, U extends OriTableLayoutUiStore<T> = OriTableLayoutUiStore<T>, P = any, S = any> extends React.Component<P, S>{

    public abstract uiStore: U;

    public abstract columns: ColumnsType<T>;

    public rowSelection?: TableRowSelection<T>;


    public render() {
        console.log('render')
        return (
            <OriLayout
                orientation='vertical'
                topContent={this.getTopBar()}
                middleContent={
                    <Table<T>
                        className='ori-tablelayout-table'
                        columns={this.columns}
                        dataSource={this.uiStore.dataSource}
                        rowSelection={this.rowSelection}
                        loading={this.uiStore.loading}
                        scroll={{ y: 'calc(100% - 55px)' }}
                        bordered={true}
                    />
                }
                middleStretch={true}
                bottomContent={
                    <div style={{ borderTop: '1px solid rgb(217,217,217)', padding: '8px 0px' }}>
                        <OriPagination
                            size={this.uiStore.pageSize}
                            index={this.uiStore.pageIndex}
                            total={this.uiStore.totalCount}
                            onChange={(index, size) => {
                                console.log('paginationChange:', index, size)
                                this.uiStore.pageIndex = index;
                                this.uiStore.pageSize = size;
                                this.uiStore.totalCount = 0;
                                this.uiStore.dataSource = [];
                                this.uiStore.loading = true;
                            }}
                        />
                    </div>
                }
            />
        )
    }

    public getTopBar(): React.ReactNode {
        return <React.Fragment />
    }
}