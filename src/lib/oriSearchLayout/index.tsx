import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { OriContext } from '../oriContext';
import { OriLayout } from '../oriLayout';
import { OriPagination } from '../oriPagination';
import { IOriSearchFormField, OriSearchForm } from '../oriSearchForm';
import { OriTable } from '../oriTable';


export interface IOriSearchLayout<T, Q, S extends OriSearchLayoutUiStore<T> = OriSearchLayoutUiStore<T>> {
    columns: ColumnsType<T>;
    tableBar?: React.ReactNode;
    fields?: IOriSearchFormField[];
    rowKey?: keyof T;
    selectable?: boolean;
    formEnd?: React.ReactNode;
    uiAction?: OriSearchLayoutUiAction<T, Q, S>;
    uiStore?: OriSearchLayoutUiStore<T>;
}

export class OriSearchLayoutUiStore<T>{

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

    public selectedRowKeys: React.Key[] = [];

    public selectedRows: T[] = [];

    public totalCount: number = 0;

}
export class OriSearchLayoutUiAction<T, Q, S extends OriSearchLayoutUiStore<T> = OriSearchLayoutUiStore<T>>{

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


export class OriSearchLayout<T extends AnyObject, Q extends AnyObject = any> extends React.Component<IOriSearchLayout<T, Q>, any>{

    private _uiStore: OriSearchLayoutUiStore<T>;

    private _uiAction: OriSearchLayoutUiAction<T, Q, OriSearchLayoutUiStore<T>>;

    constructor(props: IOriSearchLayout<T, Q>) {
        super(props)
        this._uiStore = props.uiStore ? props.uiStore : new OriSearchLayoutUiStore<T>();
        this._uiAction = props.uiAction ? props.uiAction : new OriSearchLayoutUiAction<T, Q, OriSearchLayoutUiStore<T>>(this._uiStore);

    }


    public render() {
        return (
            <OriLayout
                orientation='vertical'
                topContent={
                    this.props.fields ?
                        <OriSearchForm<Q>
                            fields={this.props.fields}
                            onSearch={(value) => this._uiAction.onSearch(value)}
                            onFieldsChange={(name, value) => { console.log(name, value) }}
                            addOnEnd={this.props.formEnd}
                        />
                        : this.props.tableBar
                            ?
                            this.props.tableBar
                            :
                            <></>
                }
                middleContent={
                    <OriTable<T>
                        rowKey={this.props.rowKey ? this.props.rowKey : this._uiAction.getRowKey}
                        columns={
                            [
                                ...this.props.columns,
                                {
                                    title: '',
                                    dataIndex: "flex-col",
                                },
                            ]
                        }
                        dataSource={this._uiStore.dataSource}
                        rowSelection={
                            this.props.selectable ? {
                                selectedRowKeys: this._uiStore.selectedRowKeys,
                                onChange: (selectedRowKeys, selectedRows, info) => {
                                    this._uiStore.selectedRowKeys = selectedRowKeys;
                                    this._uiStore.selectedRows = selectedRows;
                                },
                            } : undefined
                        }
                        loading={{ spinning: this._uiStore.loading, tip: "加载中..." }}
                    />
                }
                middleStretch={true}
                bottomContent={
                    <OriPagination
                        addOnBefore={this.props.selectable ?
                            <div className='ori-flex-row'>
                                <ExclamationCircleTwoTone twoToneColor={OriContext.primaryColor} style={{ marginRight: '8px' }} />
                                <span>已选中</span>
                                <span style={{ margin: '0px 8px' }}>{this._uiStore.selectedRowKeys.length}</span>
                                <span>条</span>
                            </div>
                            :
                            <></>
                        }
                        size={this._uiStore.pageSize}
                        index={this._uiStore.pageIndex}
                        total={this._uiStore.totalCount}
                        onChange={(index, size) => this._uiAction.onPaginationChange(index, size)}
                    />
                }
            />
        )
    }

}

observer(OriSearchLayout)