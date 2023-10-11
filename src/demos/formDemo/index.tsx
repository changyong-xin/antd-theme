import { Button, Card } from 'antd';
import React from 'react';
import { OriSearchForm, OriSelect, OriTreeSelect } from '../../lib';

export class SearchFormDemo extends React.Component<any, any>{


    public render() {
        return (
            <div>
                <Card title={'基础查询表单，包含输入框及日期选择组件'} style={{ marginBottom: '16px' }} >
                    <OriSearchForm
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
                <Card title={'使用自定义组件，注意：需要实现接口的value及onChange'} style={{ marginBottom: '16px' }}  >

                    <OriSearchForm
                        fields={[
                            {
                                name: 'OperatorId',
                                valueInput: <OriSelect
                                    allowClear={true}
                                    placeholder={'请选择'}
                                    options={[
                                        { value: '1', label: '张三' },
                                        { value: '2', label: '李四' },
                                        { value: '3', label: '管理员' },
                                    ]}
                                />,
                                initialValue: '3',
                                description: '操作员',
                            },
                            {
                                name: 'Operators',
                                valueInput: <OriSelect
                                    width={200}
                                    allowClear={true}
                                    mode={'multiple'}
                                    placeholder={'请选择多个'}
                                    options={[
                                        { id: '1', name: '张三' },
                                        { id: '2', name: '李四' },
                                        { id: '3', name: '管理员' },
                                    ]}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name'
                                    }}
                                />,
                                description: '操作员',
                                initialValue: ['1', '3']
                            },
                            {
                                name: 'DeptOperators',
                                valueInput: <OriTreeSelect
                                    width={200}
                                    allowClear={true}
                                    multiple={true}
                                    placeholder={'请选择多个'}
                                    treeDefaultExpandAll={true}
                                    treeData={[
                                        {
                                            id: '1', name: '开发部', children: [
                                                { id: '01', name: '张三' },
                                                { id: '02', name: '李四' },
                                            ]
                                        },
                                        {
                                            id: '2', name: '测试部门', children: [
                                                { id: '03', name: '张三三' },
                                                { id: '04', name: '李四四' },
                                            ]
                                        },
                                    ]}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name'
                                    }}
                                />,
                                description: '操作员',
                                initialValue: ['04']
                            },
                        ]}
                        onSearch={this.onSearch}
                        onFieldsChange={this.onFieldsChange}
                    />
                </Card>
                <Card title={'不使用表单，则仅相当于一个between布局的div，只有addOnAfter及addOnEnd'} style={{ marginBottom: '16px' }} >
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

    public onFieldsChange = (name: string, value: string | string[] | [string, string]) => {
        console.log(name, value)
    }
    public onDividualSearchClick = (name: string, value: any) => {
        console.log(name, value)
    }

}