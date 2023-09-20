import { makeObservable, observable } from 'mobx';
import React, { ReactNode } from 'react';
import { OriTableLayout, OriTableLayoutUiAction, OriTableLayoutUiStore } from '../../../lib';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';

interface IDemoDataEntity {
    name: string;
    age: number;
    sex: '0' | '1';
}
interface IDemoDataQo {
    name?: string;
    createDate?: string;
}

class SimpleTableLayoutStore extends OriTableLayoutUiStore<IDemoDataEntity> {

    public visible: boolean = false;

    constructor() {
        super()
        makeObservable(this, {
            visible: observable
        })
    }
}

class SimpleTableLayoutDoaminAction extends OriTableLayoutUiAction<IDemoDataEntity, IDemoDataQo, SimpleTableLayoutStore>{
    public onSearch(value: IDemoDataQo) {
        console.log(value)
        this.uiStore.loading = true;
        this.uiStore.dataSource = [];
        setTimeout(() => {
            this.uiStore.dataSource = [
                { name: '1', sex: '0', age: 1 },
                { name: '2', sex: '0', age: 1 },
                { name: '1', sex: '0', age: 1 },
                { name: '3', sex: '0', age: 1 },
                { name: '4', sex: '0', age: 1 },
                { name: '5', sex: '0', age: 1 },
                { name: '6', sex: '0', age: 1 },
                { name: '7', sex: '0', age: 1 },
                { name: '8', sex: '0', age: 1 },
            ]
            this.uiStore.loading = false;
        }, 1000);
    }
}



export class SimpleTableLayout extends React.Component {

    private _uiStore = new SimpleTableLayoutStore();

    private _uiAction = new SimpleTableLayoutDoaminAction(this._uiStore)

    public render(): ReactNode {
        return (
            <OriTableLayout<IDemoDataEntity, IDemoDataEntity>
                uiStore={this._uiStore}
                uiAction={this._uiAction}
                extra={
                    < div >
                        <Button onClick={() => { this._uiStore.visible = !this._uiStore.visible }} >新增</Button>
                        <Modal title={'demo'} open={this._uiStore.visible} onCancel={() => this._uiStore.visible = false} >
                            <div>Demo Modal</div>
                        </Modal>
                    </div>
                }
                fields={
                    [
                        {
                            name: 'name',
                            allowClear: true,
                            valueInput: 'input',
                            description: '姓名'
                        },
                        {
                            name: 'createDate',
                            allowClear: true,
                            valueInput: 'YYYY-MM-DD',
                            description: '创建日期'
                        }
                    ]
                }
                columns={
                    [
                        {
                            title: '姓名',
                            dataIndex: "name",
                            width: 100,
                            fixed: true,
                            sorter: true,
                        },
                        {
                            title: '性别',
                            dataIndex: "sex",
                            width: 600
                        },
                        {
                            title: '年龄',
                            dataIndex: "age",
                            width: 600
                        },
                        {
                            title: '',
                            dataIndex: "flex-col",
                        },
                    ]
                }
            />
        )
    }


}

observer(SimpleTableLayout)
