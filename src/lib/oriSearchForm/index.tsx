import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, Tooltip } from 'antd';
import { FieldData } from 'rc-field-form/es/interface';
import React, { useEffect, useRef } from 'react';
import { FieldVlaue, IOriForm, IOriSearchFormField } from '../interface';
import { OriDatePicker } from '../oriDatePicker';
import { OriInput } from '../oriInput';
import { OriMonthPicker } from '../oriMonthPicker';
import { OriTimePicker } from '../oriTimePicker';
import './index.scss';
import { AnyObject } from 'antd/es/_util/type';

function getField<T>(field: IOriSearchFormField<T>): React.ReactNode {
    if (typeof (field.valueInput) === 'string') {
        switch (field.valueInput) {
            case 'YYYYMM':
                return <OriMonthPicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'YYYY-MM':
                return <OriMonthPicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'YYYY-MM-DD':
                return <OriDatePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'YYYY-MM-DD HH':
                return <OriTimePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'YYYY-MM-DD HH:mm':
                return <OriTimePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'YYYY-MM-DD HH:mm:ss':
                return <OriTimePicker allowClear={field.allowClear || false} isRange={field.isRange || false} format={field.valueInput} />;
            case 'input': return <OriInput
                allowClear={field.allowClear || false}
                isRange={field.isRange || false}
                placeholder={field.description}
                width={field.width ? field.width : field.isRange ? 240 : 120}
            />;
            default: return <Input allowClear={field.allowClear} placeholder={field.description} />
        }
    } else if (field.valueInput) {
        return field.valueInput
    } else {
        return <Input allowClear={field.allowClear} placeholder={field.description} />
    }
}

export interface IOriSearchForm<T> extends IOriForm<T> {
    fields?: IOriSearchFormField<T>[];
    onSearch?: (value: T) => void;
    dividual?: boolean;
    onDividualClick?: (name: keyof T, value: FieldVlaue) => void;
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
export function OriSearchForm<T = AnyObject>(props: IOriSearchForm<T>) {


    const form = useRef<FormInstance<T>>(null);

    useEffect(() => {
        if (props.getFormInstance && form.current) {
            props.getFormInstance(form.current)
        }
    }, [props])

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
            {
                props.fields ?
                    <Form
                        className='ori-searchform'
                        onFieldsChange={
                            (fields: FieldData[]) => {
                                if (fields[0]) {
                                    const field = fields[0]
                                    if (field && field.validating !== true && props.onFieldsChange !== undefined) {
                                        props.onFieldsChange(field.name[0], field.value)
                                    }
                                }
                            }
                        }
                        style={{ display: "flex", flexWrap: 'wrap' }}
                        ref={form}
                    >
                        {
                            props.addOnBefore ?
                                <div className='ori-searchform-add'>
                                    {props.addOnBefore}
                                </div>
                                :
                                <></>
                        }
                        {
                            props.fields.map((item, index) => <React.Fragment key={index}>
                                <Tooltip
                                    title={item.description}
                                >
                                    <span>
                                        <Form.Item
                                            name={item.name.toString()}
                                            initialValue={item.initialValue}
                                        >
                                            {getField<T>(item)}
                                        </Form.Item>
                                    </span>
                                </Tooltip>
                                {
                                    props.dividual ?
                                        <Button
                                            style={{ marginRight: '8px' }}
                                            type='primary'
                                            onClick={() => {
                                                if (props.onDividualClick && form.current) {
                                                    props.onDividualClick(item.name, form.current.getFieldValue(item.name))
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
                            props.showSearchButton !== false && !props.dividual
                                ?
                                props.circleButton
                                    ?
                                    <Button
                                        shape='circle'
                                        style={{ marginRight: '8px', marginBottom: '8px' }}
                                        onClick={() => {
                                            if (props.onSearch && form.current) {
                                                props.onSearch(form.current.getFieldsValue())
                                            }
                                        }}>
                                        <SearchOutlined />
                                    </Button>
                                    :
                                    <Button
                                        style={{ marginRight: '8px', marginBottom: '8px' }}
                                        type='primary'
                                        onClick={() => {
                                            if (props.onSearch && form.current) {
                                                props.onSearch(form.current.getFieldsValue())
                                            }
                                        }}>
                                        查询
                                    </Button>
                                :
                                <></>
                        }
                        {
                            props.showResetButton === true ?
                                <Button
                                    style={{ marginRight: '8px', marginBottom: '8px' }}
                                    onClick={() => {
                                        if (form.current) {
                                            form.current.resetFields()
                                        }
                                    }}>
                                    重置
                                </Button>
                                :
                                <></>
                        }
                        {
                            props.addOnAfter ?
                                <div className='ori-searchform-add'>
                                    {props.addOnAfter}
                                </div>
                                :
                                <></>
                        }
                    </Form>
                    :
                    <>
                        {
                            props.addOnBefore ?
                                <div className='ori-searchform-add'>
                                    {props.addOnBefore}
                                </div>
                                :
                                <></>
                        }
                    </>
            }
            {
                props.addOnEnd ?
                    <div className='ori-searchform-add'>
                        {props.addOnEnd}
                    </div>
                    :
                    <></>
            }
        </div>
    )

}