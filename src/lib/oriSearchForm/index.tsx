import { Button, Form, FormInstance, Tooltip } from 'antd';
import React from 'react';
import { IOridForm } from '../interface';
import { OriDatePicker } from '../oriDatePicker';
import { OriInput } from '../oriInput';
import { OriMonthPicker } from '../oriMonthPicker';
import { OriTimePicker } from '../oriTimePicker';
import './index.scss';
import { SearchOutlined } from '@ant-design/icons';

declare type ValueInput = 'input' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYYMM' | 'YYYY-MM-DD HH:mm:ss';

declare type FieldVlaue = React.Key | [React.Key, React.Key] | React.Key[];

export interface IOriSearchFormField {
    name: string;
    /** 中文描述 */
    description: string;
    /** 输入组件的类型，从默认类型中选择或直接使用自定义组件，注意：需要实现接口的value及onChange */
    valueInput: ValueInput | React.ReactNode;
    width?: number;
    allowClear?: boolean;
    /** 是否是区间查询 */
    isRange?: boolean;
    /** 初始值 */
    initialValue?: FieldVlaue;
}

export interface IOriSearchForm<T> extends IOridForm<T> {
    fields: IOriSearchFormField[];
    onSearch?: (value: T) => void;
    dividual?: boolean;
    onDividualClick?: (name: string, value: FieldVlaue) => void;
    showSearchButton?: boolean;
    showResetButton?: boolean;
    circleButton?: boolean;
    addOnBefore?: React.ReactNode;
    addOnAfter?: React.ReactNode;
    addOnEnd?: React.ReactNode;
}


/**
 * 查询表单
 * 
 */
export class OriSearchForm<T> extends React.Component<IOriSearchForm<T>, any>{

    private _form = React.createRef<FormInstance<T>>();

    public componentDidMount() {
        if (this.props.getFormInstance && this._form.current) {
            this.props.getFormInstance(this._form.current)
        }
    }

    public render() {
        return (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                <Form className='ori-searchform' style={{ display: "flex", flexWrap: 'wrap' }} ref={this._form} >
                    {
                        this.props.addOnBefore ?
                            <div className='ori-searchform-add'>
                                {this.props.addOnBefore}
                            </div>
                            :
                            <></>
                    }
                    {
                        this.props.fields.map((item, index) => <React.Fragment key={index}>
                            <Tooltip
                                title={item.description}
                            >
                                <span>
                                    <Form.Item
                                        name={item.name}
                                        initialValue={item.initialValue}
                                    >
                                        {this.getField(item)}
                                    </Form.Item>
                                </span>
                            </Tooltip>
                            {
                                this.props.dividual ?
                                    <Button
                                        style={{ marginRight: '8px' }}
                                        type='primary'
                                        onClick={() => {
                                            if (this.props.onDividualClick && this._form.current) {
                                                this.props.onDividualClick(item.name, this._form.current.getFieldValue(item.name))
                                            }
                                        }}
                                    >
                                        查询
                                    </Button>
                                    :
                                    <></>
                            }
                        </React.Fragment>
                        )
                    }
                    {
                        this.props.showSearchButton !== false && !this.props.dividual
                            ?
                            this.props.circleButton
                                ?
                                <Button
                                    shape='circle'
                                    style={{ marginRight: '8px', marginBottom: '8px' }}
                                    onClick={() => {
                                        if (this.props.onSearch && this._form.current) {
                                            this.props.onSearch(this._form.current.getFieldsValue())
                                        }
                                    }}>
                                    <SearchOutlined />
                                </Button>
                                :
                                <Button
                                    style={{ marginRight: '8px', marginBottom: '8px' }}
                                    type='primary'
                                    onClick={() => {
                                        if (this.props.onSearch && this._form.current) {
                                            this.props.onSearch(this._form.current.getFieldsValue())
                                        }
                                    }}>
                                    查询
                                </Button>
                            :
                            <></>
                    }
                    {
                        this.props.showResetButton === true ?
                            <Button
                                style={{ marginRight: '8px', marginBottom: '8px' }}
                                onClick={() => {
                                    if (this._form.current) {
                                        this._form.current.resetFields()
                                    }
                                }}>
                                重置
                            </Button>
                            :
                            <></>
                    }
                    {
                        this.props.addOnAfter ?
                            <div className='ori-searchform-add'>
                                {this.props.addOnAfter}
                            </div>
                            :
                            <></>
                    }
                </Form>
                {
                    this.props.addOnEnd ?
                        <div className='ori-searchform-add'>
                            {this.props.addOnEnd}
                        </div>
                        :
                        <></>
                }
            </div>
        )
    }

    public getField = (field: IOriSearchFormField): React.ReactNode => {
        if (typeof (field.valueInput) === 'string') {
            switch (field.valueInput) {
                case 'YYYYMM':
                    return <OriMonthPicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
                case 'YYYY-MM':
                    return <OriMonthPicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
                case 'YYYY-MM-DD':
                    return <OriDatePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
                case 'YYYY-MM-DD HH:mm:ss':
                    return <OriTimePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
                case 'input':
                    return (
                        <OriInput
                            allowClear={field.allowClear || false}
                            isRange={field.isRange || false}
                            placeholder={field.description}
                            width={field.width ? field.width : field.isRange ? 240 : 120}
                        />
                    );
                default: return <></>
            }
        } else {
            return field.valueInput
        }
    }

}