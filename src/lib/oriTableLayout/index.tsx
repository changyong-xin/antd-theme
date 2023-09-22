import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { OriLayout } from '../oriLayout';
import { OriPagination } from '../oriPagination';
import { IOriSearchFormField, OriSearchForm } from '../oriSearchForm';
import { OriTable } from '../oriTable';


interface IOriTableLayout<T, Q, S extends OriTableLayoutUiStore<T> = OriTableLayoutUiStore<T>> {
    fields: IOriSearchFormField[];
    columns: ColumnsType<T>;
    rowKey?:  keyof T;
    rowSelection?: TableRowSelection<T>;
    extra?: React.ReactNode;
    uiAction?: OriTableLayoutUiAction<T, Q, S>;
    uiStore?: OriTableLayoutUiStore<T>;
}

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
export class OriTableLayoutUiAction<T, Q, S extends OriTableLayoutUiStore<T> = OriTableLayoutUiStore<T>>{

    public uiStore: S

    constructor(store: S) {
        this.uiStore = store
    }

    public onSearch(value: Q) {
        console.log(value)
    }

    public onPaginationChange(index: number, size: number) {
        console.log(index, size)
        this.uiStore.pageIndex = index;
        this.uiStore.pageSize = size;
        this.uiStore.totalCount = 0;
        this.uiStore.dataSource = [];
    }

    // antd警告，index作为rowKey可能存在问题
    public getRowKey(record: T, index?: number) {
        return index ? index.toString() : ''
    }
}


export class OriTableLayout<T extends AnyObject, Q extends AnyObject = any> extends React.Component<IOriTableLayout<T, Q>, any>{

    private _uiStore: OriTableLayoutUiStore<T>;

    private _uiAction: OriTableLayoutUiAction<T, Q, OriTableLayoutUiStore<T>>;

    constructor(props: IOriTableLayout<T, Q>) {
        super(props)
        this._uiStore = props.uiStore ? props.uiStore : new OriTableLayoutUiStore<T>();
        this._uiAction = props.uiAction ? props.uiAction : new OriTableLayoutUiAction<T, Q, OriTableLayoutUiStore<T>>(this._uiStore);

    }


    public render() {
        return (
            <OriLayout
                orientation='vertical'
                topContent={
                    <OriSearchForm<Q>
                        fields={this.props.fields}
                        onSearch={(value) => this._uiAction.onSearch(value)}
                        onFieldsChange={(name, value) => { console.log(name, value) }}
                        addOnEnd={this.props.extra}
                    />
                }
                middleContent={
                    <OriTable<T>
                        rowKey={this.props.rowKey ? this.props.rowKey : this._uiAction.getRowKey}
                        columns={this.props.columns}
                        dataSource={this._uiStore.dataSource}
                        rowSelection={this.props.rowSelection}
                        loading={this._uiStore.loading}
                    />
                }
                middleStretch={true}
                bottomContent={
                    <div style={{ borderTop: '1px solid rgb(217,217,217)', padding: '8px 0px' }}>
                        <OriPagination
                            size={this._uiStore.pageSize}
                            index={this._uiStore.pageIndex}
                            total={this._uiStore.totalCount}
                            onChange={(index, size) => this._uiAction.onPaginationChange(index, size)}
                        />
                    </div>
                }
            />
        )
    }

}

observer(OriTableLayout)