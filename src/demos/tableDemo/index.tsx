import { Button } from 'antd';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { OriTable } from '../../lib';



class TableUiStore {

    constructor() {
        makeAutoObservable(this)
    }

    public tableData: any[] = [{ title: '456' }]
}



class ChildrenTable extends React.Component<{ domain: TableUiStore }, any>{

    //  Mobx6.0禁止使用shouldComponentUpdate方法
    //  public shouldComponentUpdate(nextProps: Readonly<{ domain: TableUiStore; }>, nextState: Readonly<any>, nextContext: any): boolean {
    //     console.log('should')
    //     return true
    // }

    public render() {
        console.log('render', this.props.domain.tableData.length)
        return (
            <>
                <div style={{ padding: '16px' }} >
                    <Button onClick={() => {
                        this.props.domain.tableData = [{ title: '123' }]
                    }} >查询</Button>
                    <Button onClick={() => {
                        this.props.domain.tableData = []
                    }} >清空</Button>
                </div>
                <OriTable
                    rowKey={'title'}
                    dataSource={this.props.domain.tableData}
                    columns={[{
                        dataIndex: "title",
                        title: 'Title',
                        width: 100
                    }]}
                />
            </>
        )
    }

}


observer(ChildrenTable)

export class OriTableDemo extends React.Component<any, any>{

    private _uiStore = new TableUiStore()


    public render() {
        console.log('OriTableReander')
        return (
            <>
                <div style={{ padding: '16px', height: "100%" }} >
                    <ChildrenTable domain={this._uiStore} />
                </div>
            </>
        )
    }

}