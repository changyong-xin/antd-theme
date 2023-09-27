import { DatePicker } from 'antd';
import { dayjsTrans } from '../utils';

interface IOriDatePicker {
    isRange: boolean;
    format: string;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export function OriDatePicker(props: IOriDatePicker) {

    return (
        props.isRange ?
            <DatePicker.RangePicker
                allowClear={props.allowClear}
                value={typeof (props.value) === 'object' ? [dayjsTrans(props.value[0], props.format), dayjsTrans(props.value[1], props.format)] : undefined}
                format={props.format}
                style={{ width: '240px' }}
                placeholder={['开始日期', '结束日期']}
                onChange={(date, dateStr) => {
                    props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)
                }}
            />
            :
            <DatePicker
                allowClear={props.allowClear}
                style={{ width: '120px' }}
                placeholder={'日期'}
                format={props.format}
                value={typeof (props.value) === 'string' ? dayjsTrans(props.value, props.format) : undefined}
                onChange={(date, dateStr) => {
                    props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)
                }}
            />
    )
}