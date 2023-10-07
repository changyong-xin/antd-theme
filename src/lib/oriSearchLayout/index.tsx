import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { observer } from 'mobx-react';
import React from 'react';
import { OriContext } from '../oriContext';
import { OriLayout } from '../oriLayout';
import { OriPagination } from '../oriPagination';
import { IOriSearchForm, OriSearchForm } from '../oriSearchForm';
import { OriTable } from '../oriTable';
import { OriSearchLayoutUiAction } from './uiAction';
import { OriSearchLayoutUiStore } from './uiStore';


export interface IOriSearchLayout<T, Q, S extends OriSearchLayoutUiStore<T> = OriSearchLayoutUiStore<T>> extends IOriSearchForm<Q> {
    columns?: ColumnsType<T>;
    rowKey?: keyof T;
    selectable?: boolean;
    uiAction?: OriSearchLayoutUiAction<T, Q, S>;
    uiStore?: OriSearchLayoutUiStore<T>;
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
                    <OriSearchForm<Q>
                        addOnBefore={this.props.addOnAfter}
                        addOnAfter={this.props.addOnAfter}
                        fields={this.props.fields}
                        onSearch={this._uiAction.onSearch}
                        onFieldsChange={this._uiAction.onFieldsChange}
                        addOnEnd={this.props.addOnEnd}
                    />
                }
                middleContent={
                    <OriTable<T>
                        rowKey={this.props.rowKey || this._uiAction.getRowKey}
                        columns={
                            [
                                ...(this.props.columns || []),
                                {
                                    dataIndex: "ori-searchlayout-flex-col",
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
                        addOnBefore={
                            this.props.selectable
                                ?
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