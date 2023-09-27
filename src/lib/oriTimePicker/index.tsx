import { DatePicker } from 'antd';
import { dayjsTrans } from '../utils';

interface IOriTimePicker {
    isRange: boolean;
    format: string;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export function OriTimePicker(props: IOriTimePicker) {

    return (
        props.isRange ?
            <DatePicker.RangePicker
                showTime={true}
                allowClear={props.allowClear}
                value={typeof (props.value) === 'object' ? [dayjsTrans(props.value[0], props.format), dayjsTrans(props.value[1], props.format)] : undefined}
                format={props.format}
                style={{ width: '320px' }}
                placeholder={['开始时间', '结束时间']}
                onChange={(date: any, dateStr: [string, string]) => props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)}
            />
            :
            <DatePicker
                showTime={true}
                allowClear={props.allowClear}
                style={{ width: '180px' }}
                placeholder={'时间'}
                format={props.format}
                value={typeof (props.value) === 'string' ? dayjsTrans(props.value, props.format) : undefined}
                onChange={(date: any, dateStr: string) => props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)}
            />
    )

}