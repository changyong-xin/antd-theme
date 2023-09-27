import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { dayjsTrans } from '../utils';

interface IOriMonthPicker {
    isRange: boolean;
    format: string;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}


export function OriMonthPicker(props: IOriMonthPicker) {

    const selectValue: [string | undefined, string | undefined] = [undefined, undefined];

    const [open, setOpen] = React.useState(false)

    return (
        props.isRange ?
            <DatePicker.RangePicker
                picker='month'
                allowClear={props.allowClear}
                value={typeof (props.value) === 'object' ? [dayjsTrans(props.value[0], props.format), dayjsTrans(props.value[1], props.format)] : undefined}
                format={props.format}
                style={{ width: '200px' }}
                placeholder={['开始账期', '结束账期']}
                onChange={(date: any, dateStr) => props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)}
                onPanelChange={
                    (value, mode) => {
                        if (mode[0] === 'date') {
                            selectValue[0] = dayjs(value ? value[0] : undefined).format(props.format)
                        }
                        if (mode[1] === 'date') {
                            selectValue[1] = dayjs(value ? value[1] : undefined).format(props.format)
                        }
                        if (selectValue[0] && selectValue[1]) {
                            if (props.onChange) {
                                props.onChange(selectValue as [string, string])
                            }
                            selectValue[0] = undefined;
                            selectValue[1] = undefined;
                            setOpen(false)
                        }
                    }
                }
                open={open}
                onOpenChange={(status) => setOpen(status)}
                onMouseLeave={() => {
                    selectValue[0] = undefined;
                    selectValue[1] = undefined;
                }}
            />
            :
            <DatePicker.MonthPicker
                allowClear={props.allowClear}
                style={{ width: '120px' }}
                placeholder={'账期'}
                format={props.format}
                value={typeof (props.value) === 'string' ? dayjsTrans(props.value, props.format) : undefined}
                onChange={(date: any, dateStr: string) => props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)}
            />
    )
}