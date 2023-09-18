import { Input } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import Form, { FormItemProps } from 'antd/lib/form';
import { FieldData } from 'rc-field-form/lib/interface';
import React from 'react';
import { OriGrid } from '../oriGrid';
import { IOridForm } from '../interface';


interface IOriGridForm<T> extends IOridForm<T> {
    items: FormItemProps[]
    cols: number;
    labelCol?: number;
    wrapperCol?: number;
    rowHeight?: number | string;
}

export class OriGridForm<T = any> extends React.Component<IOriGridForm<T>, any>{

    private _form = React.createRef<FormInstance<T>>();

    public componentDidMount() {
        if (this.props.getFormInstance !== undefined && this._form.current) {
            this.props.getFormInstance(this._form.current)
        }
    }

    public render() {
        return (
            <Form ref={this._form} onFieldsChange={this.onFieldsChange} validateMessages={{ required: "不能为空", }} >
                <OriGrid<FormItemProps>
                    cols={this.props.cols}
                    dataSource={this.props.items}
                    render={(item) =>
                        <Form.Item
                            labelCol={{ span: this.props.labelCol }}
                            wrapperCol={{ span: this.props.wrapperCol }}
                            label={item.label}
                            name={item.name}
                            rules={item.rules}
                            initialValue={item.initialValue}
                            valuePropName={item.valuePropName}
                        >
                            {item.children || <Input />}
                        </Form.Item>
                    }
                    rowHeight={this.props.rowHeight || '64px'}
                />
            </Form>
        )
    }

    public onFieldsChange = (fields: FieldData[]) => {
        if (fields[0]) {
            const field = fields[0]
            if (field && field.validating !== true && this.props.onFieldsChange !== undefined) {
                this.props.onFieldsChange(field.name[0], field.value)
            }
        }
    }
}