import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { theme } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { observer } from 'mobx-react';
import React from 'react';
import { ICustomConfig } from '../interface';
import { OriLayout } from '../oriLayout';
import { OriPagination } from '../oriPagination';
import { IOriSearchForm, OriSearchForm } from '../oriSearchForm';
import { OriTable } from '../oriTable';
import { OriSearchLayoutDomain } from './domain';

function SelectCounts(props: { count: number, extra?: React.ReactNode }) {
    const token = theme.useToken()
    return (
        <div className='ori-flex-row'>
            <ExclamationCircleTwoTone twoToneColor={token.token.colorPrimary} style={{ marginRight: '8px' }} />
            <span>已选择</span>
            <span style={{ margin: '0px 8px' }}>{props.count}</span>
            <span>项</span>
            {
                props.extra
            }
        </div>
    )
}

export interface IOriSearchLayout<T, Q> extends IOriSearchForm<Q> {
    customConfig?: ICustomConfig<T>
    selectable?: boolean;
    selectExtra?: React.ReactNode;
    domain?: OriSearchLayoutDomain<T, Q>;
}


export class OriSearchLayout<T extends AnyObject = any, Q extends AnyObject = any> extends React.Component<IOriSearchLayout<T, Q>, any>{

    private _domain: OriSearchLayoutDomain<T, Q>

    constructor(props: IOriSearchLayout<T, Q>) {
        super(props)
        this._domain = props.domain ? props.domain : new OriSearchLayoutDomain<T, Q>();
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
                        onSearch={this._domain.onSearch}
                        onFieldsChange={this._domain.onFieldsChange}
                        addOnEnd={this.props.addOnEnd}
                    />
                }
                middleContent={
                    <OriTable<T>
                        customConfig={this.props.customConfig}
                        rowKey={this._domain.getRowKey}
                        columns={this._domain.columns}
                        dataSource={this._domain.dataSource}
                        rowSelection={
                            this.props.selectable ? {
                                selectedRowKeys: this._domain.selectedRowKeys,
                                onChange: (selectedRowKeys, selectedRows, info) => {
                                    this._domain.selectedRowKeys = selectedRowKeys;
                                    this._domain.selectedRows = selectedRows;
                                },
                            } : undefined
                        }
                        loading={{ spinning: this._domain.loading, tip: "加载中..." }}
                    />
                }
                middleStretch={true}
                bottomContent={
                    <OriPagination
                        addOnBefore={
                            this.props.selectable
                                ?
                                <SelectCounts count={this._domain.selectedRowKeys.length} />
                                :
                                <></>
                        }
                        size={this._domain.pageSize}
                        index={this._domain.pageIndex}
                        total={this._domain.totalCount}
                        onChange={(index, size) => this._domain.onPaginationChange(index, size)}
                    />
                }
            />
        )
    }

}

observer(OriSearchLayout)