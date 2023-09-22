import { DatePicker } from 'antd';
import React from 'react';
import { dayjsTrans } from '../utils';

interface IOriDatePicker {
    isRange: boolean;
    format: string;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export class OriDatePicker extends React.Component<IOriDatePicker, any>{

    public render() {
        return (
            this.props.isRange ?
                <DatePicker.RangePicker
                    allowClear={this.props.allowClear}
                    value={typeof (this.props.value) === 'object' ? [dayjsTrans(this.props.value[0], this.props.format), dayjsTrans(this.props.value[1], this.props.format)] : undefined}
                    format={this.props.format}
                    style={{ width: '240px' }}
                    placeholder={['开始日期', '结束日期']}
                    onChange={(date, dateStr) => {
                        this.props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)
                    }}
                />
                :
                <DatePicker
                    allowClear={this.props.allowClear}
                    style={{ width: '120px' }}
                    placeholder={'日期'}
                    format={this.props.format}
                    value={typeof (this.props.value) === 'string' ? dayjsTrans(this.props.value, this.props.format) : undefined}
                    onChange={(date, dateStr) => {
                        this.props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)
                    }}
                />
        )
    }

}