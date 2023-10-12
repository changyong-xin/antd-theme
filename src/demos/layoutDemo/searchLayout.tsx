import { Button, Modal, Switch } from 'antd';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { ReactNode } from 'react';
import { OriSearchLayout } from '../../lib';
import { OriSearchLayoutDomain } from '../../lib/oriSearchLayout/domain';

interface IDemoDataEntity {
    name: string;
    age: number;
    sex: '0' | '1';
}
interface IDemoDataQo {
    name?: string;
    createDate?: string;
}


class SimpleSearchLayoutDoaminAction extends OriSearchLayoutDomain<IDemoDataEntity, IDemoDataQo>{



    constructor() {
        super()
        makeObservable(this, {
            visible: observable,
            selectable: observable
        })
        this.columns = [
            {
                title: '姓名',
                dataIndex: "name",
                width: 500,
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

    public visible: boolean = false;

    public selectable: boolean = true;

    public requestTableData(value: IDemoDataQo) {
        console.log(value)
        setTimeout(() => {
            this.dataSource = [
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
            this.totalCount = 16;
            this.loading = false;
        }, 1000);
    }
}



export class SimpleSearchLayoutDemo extends React.Component<any, any> {

    private _domain = new SimpleSearchLayoutDoaminAction();


    public render(): ReactNode {
        return (
            <OriSearchLayout<IDemoDataEntity, IDemoDataQo>
                domain={this._domain}
                selectable={this._domain.selectable}
                addOnEnd={
                    < div >
                        <span>
                            表格数据可选
                            <Switch
                                style={{ margin: '0px 8px' }}
                                checked={this._domain.selectable}
                                onChange={(checked) => {
                                    this._domain.selectable = checked
                                }}
                                checkedChildren={'on'}
                                unCheckedChildren={'off'}
                            />
                        </span>
                        <Button onClick={() => { this._domain.visible = !this._domain.visible }} >新增</Button>
                        <Modal title={'demo'} open={this._domain.visible} onCancel={() => this._domain.visible = false} >
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

            />
        )
    }


}

observer(SimpleSearchLayoutDemo)
