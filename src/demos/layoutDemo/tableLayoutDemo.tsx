import { Button, Modal, TableColumnsType } from 'antd';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { OriSearchForm, OriTableLayout, OriTableLayoutUiStore } from '../../lib';
import { ReactNode } from 'react';

interface IDemoDataEntity {
    name: string;
    age: number;
    sex: '0' | '1';
}

class TableLayoutDemoStore extends OriTableLayoutUiStore<IDemoDataEntity>{

    public visible: boolean = false;

    constructor() {
        super()
        makeObservable(this, {
            visible: observable
        })
    }
}



export class TableLayoutDemo extends OriTableLayout<IDemoDataEntity, TableLayoutDemoStore> {


    constructor(props: any) {
        super(props)
        this.onSearch = this.onSearch.bind(this)
    }

    public uiStore: TableLayoutDemoStore = new TableLayoutDemoStore();

    public columns: TableColumnsType<IDemoDataEntity> = [
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
    ];


    public onSearch() {
        console.log(this.uiStore.dataSource)
        this.uiStore.dataSource = [
            {
                name: '1',
                sex: '0',
                age: 1
            },
            {
                name: '2',
                sex: '0',
                age: 1
            },
            {
                name: '1',
                sex: '0',
                age: 1
            },
            {
                name: '3',
                sex: '0',
                age: 1
            },
            {
                name: '4',
                sex: '0',
                age: 1
            },
            {
                name: '5',
                sex: '0',
                age: 1
            },
            {
                name: '6',
                sex: '0',
                age: 1
            },
            {
                name: '7',
                sex: '0',
                age: 1
            },
            {
                name: '8',
                sex: '0',
                age: 1
            },
        ]
    }

    public getTopBar(): ReactNode {
        return (
            <OriSearchForm
                fields={[
                    {
                        name: 'name',
                        allowClear: true,
                        valueInput: 'input',
                        description: '姓名'
                    },
                    {
                        name: 'createDate',
                        isRange: true,
                        valueInput: 'YYYY-MM-DD',
                        description: '创建日期'
                    },
                ]}
                onSearch={this.onSearch}
                onFieldsChange={(name, value) => { console.log(name, value) }}
                extra={
                    < div >
                        <Button onClick={() => { this.uiStore.visible = !this.uiStore.visible }} >新增</Button>
                        <Modal title={'demo'} open={this.uiStore.visible} onCancel={() => this.uiStore.visible = false} >
                            <div>Demo Modal</div>
                        </Modal>
                    </div>
                }
            />
        )
    }

}

observer(TableLayoutDemo)