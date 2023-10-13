import { ColumnsType } from 'antd/es/table';
import { makeObservable, observable } from 'mobx';
import React from 'react';

export class OriSearchLayoutDomain<T, Q> {

    public dataSource: T[] = [];

    public loading: boolean = false;

    public pageIndex: number = 1;

    public pageSize: number = 20;

    public selectedRowKeys: React.Key[] = [];

    public selectedRows: T[] = [];

    public totalCount: number = 0;

    public columns: ColumnsType<T> = [];

    public queryParam?: Q;

    constructor() {
        makeObservable(this, {
            dataSource: observable,
            loading: observable,
            pageIndex: observable,
            pageSize: observable,
            selectedRowKeys: observable,
            totalCount: observable,
            columns: observable,
        })
        this.onSearch = this.onSearch.bind(this);
        this.onFieldsChange = this.onFieldsChange.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
    }


    public onSearch(value: Q) {
        this.queryParam = value;
        this.loading = true;
        this.dataSource = [];
        this.requestTableData(value)
        return
    }

    public onFieldsChange(name: keyof Q, value: any) {
        return
    }

    public onPaginationChange(index: number, size: number) {
        this.pageIndex = index;
        this.pageSize = size;
        if (this.queryParam) {
            this.onSearch(this.queryParam)
        }
        return
    }

    // antd警告，index作为rowKey可能存在问题
    public getRowKey(record: T, index?: number) {
        return index ? index.toString() : ''
    }

    public requestTableData(value: Q) {
        return
    }
}