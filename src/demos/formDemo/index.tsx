import { Button, Card } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import { OriSearchForm } from '../../lib';

interface IQo extends AnyObject {
    CustomerName: string
    CustomerNo: string;
}

export class SearchFormDemo extends React.Component<any, any>{

    public render() {
        return (
            <div>
                <Card title={'基础查询表单，包含输入框及日期选择组件'} style={{ marginBottom: '16px' }} >
                    <OriSearchForm<IQo>
                        fields={[
                            {
                                name: 'CustomerName',
                                allowClear: true,
                                valueInput: 'input',
                                description: '客户名'
                            },
                            {
                                name: 'CustomerNo',
                                isRange: true,
                                valueInput: 'input',
                                description: '客户号'
                            },
                            {
                                name: 'UserName',
                                valueInput: 'input',
                                description: '用户名'
                            },
                            {
                                name: 'UserNo',
                                valueInput: 'input',
                                description: '用户号'
                            },
                            {
                                name: 'Address',
                                width: 240,
                                valueInput: 'input',
                                description: '地址'
                            },
                            {
                                name: 'Phone',
                                valueInput: 'input',
                                description: '联系电话'
                            },
                            {
                                name: 'YearMonth',
                                isRange: true,
                                valueInput: 'YYYY-MM',
                                description: '账期',
                                allowClear: true
                            },
                            {
                                name: 'WriteOffDate',
                                isRange: true,
                                valueInput: 'YYYY-MM-DD',
                                description: '核销日期'
                            },
                            {
                                name: 'CustomDateTime',
                                isRange: true,
                                valueInput: 'YYYY-MM-DD HH:mm:ss',
                                description: '自定义时间'
                            }
                        ]}
                        onSearch={this.onSearch}
                        onFieldsChange={this.onFieldsChange}
                        circleButton={true}
                        addOnAfter={<Button>addOnAfter</Button>}
                        addOnBefore={<Button>addOnBefore</Button>}
                        addOnEnd={<Button>addOnEnd</Button>}
                    />
                </Card>
                <Card title={'基础查询表单，表单域独立取值'} style={{ marginBottom: '16px' }}  >

                    <OriSearchForm
                        fields={[
                            {
                                name: 'CustomerName',
                                valueInput: 'input',
                                description: '客户名',
                            },
                            {
                                name: 'CustomerNo',
                                valueInput: 'input',
                                description: '客户号',
                            },
                            {
                                name: 'UserName',
                                valueInput: 'input',
                                description: '用户名',
                            },
                            {
                                name: 'UserNo',
                                valueInput: 'input',
                                description: '用户号',
                                isRange: true,
                                allowClear: true,
                                initialValue: ['123', '234']
                            }
                        ]}
                        dividual={true}
                        onDividualClick={this.onDividualSearchClick}
                        onFieldsChange={this.onFieldsChange}
                    />
                </Card>
                <Card title={'不使用表单，则仅相当于一个between布局的div，只有addOnBefore及addOnEnd'} style={{ marginBottom: '16px' }} >
                    <OriSearchForm
                        addOnAfter={<Button>addOnAfter</Button>}
                        addOnBefore={<Button>addOnBefore</Button>}
                        addOnEnd={<Button>addOnEnd</Button>}
                    />
                </Card>
            </div>
        )
    }

    public onSearch = (value: any) => {
        console.log(value)
    }

    public onFieldsChange = (name: keyof IQo, value: string | string[] | [string, string]) => {
        console.log(name, value)
    }
    public onDividualSearchClick = (name: string, value: any) => {
        console.log(name, value)
    }

}