import { Button, Modal } from 'antd';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';
import { OriSearchLayout, OriSearchLayoutUiAction, OriSearchLayoutUiStore } from '../../lib';

interface IDemoDataEntity {
    name: string;
    age: number;
    sex: '0' | '1';
}
interface IDemoDataQo {
    name?: string;
    createDate?: string;
}

class SimpleSearchLayoutStore extends OriSearchLayoutUiStore<IDemoDataEntity> {

    public visible: boolean = false;

    constructor() {
        super()
        makeObservable(this, {
            visible: observable
        })
    }
}

class SimpleSearchLayoutDoaminAction extends OriSearchLayoutUiAction<IDemoDataEntity, IDemoDataQo, SimpleSearchLayoutStore>{
    public onSearch(value: IDemoDataQo) {
        console.log(value)
        this.uiStore.loading = true;
        this.uiStore.dataSource = [];
        setTimeout(() => {
            this.uiStore.dataSource = [
                { name: '0', sex: '0', age: 1 },
                { name: '1', sex: '0', age: 1 },
                { name: '2', sex: '0', age: 1 },
                { name: '3', sex: '0', age: 1 },
                { name: '4', sex: '0', age: 1 },
                { name: '5', sex: '0', age: 1 },
                { name: '6', sex: '0', age: 1 },
                { name: '7', sex: '0', age: 1 },
                { name: '8', sex: '0', age: 1 },
                { name: '9', sex: '0', age: 1 },
                { name: '10', sex: '0', age: 1 },
                { name: '11', sex: '0', age: 1 },
                { name: '12', sex: '0', age: 1 },
                { name: '13', sex: '0', age: 1 },
                { name: '14', sex: '0', age: 1 },
                { name: '15', sex: '0', age: 1 },
            ]
            this.uiStore.totalCount = 7;
            this.uiStore.loading = false;
        }, 1000);
    }
}



export class SimpleSearchLayoutDemo extends React.Component<any, any> {

    private _uiStore = new SimpleSearchLayoutStore();

    private _uiAction = new SimpleSearchLayoutDoaminAction(this._uiStore)

    public render(): ReactNode {
        return (
            <OriSearchLayout<IDemoDataEntity, IDemoDataEntity>
                rowKey={'name'}
                uiStore={this._uiStore}
                uiAction={this._uiAction}
                formEnd={
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
                            width: 500
                        }
                    ]
                }
            />
        )
    }


}

observer(SimpleSearchLayoutDemo)
