import { DatePicker } from 'antd';
import React from 'react';
import { dayjsTrans } from '../utils';

interface IOriTimePicker {
    isRange: boolean;
    format: string;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export class OriTimePicker extends React.Component<IOriTimePicker, any>{

    public render() {
        return (
            this.props.isRange ?
                <DatePicker.RangePicker
                    showTime={true}
                    allowClear={this.props.allowClear}
                    value={typeof (this.props.value) === 'object' ? [dayjsTrans(this.props.value[0], this.props.format), dayjsTrans(this.props.value[1], this.props.format)] : undefined}
                    format={this.props.format}
                    style={{ width: '320px' }}
                    placeholder={['开始时间', '结束时间']}
                    onChange={(date: any, dateStr: [string, string]) => this.props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)}
                />
                :
                <DatePicker
                    showTime={true}
                    allowClear={this.props.allowClear}
                    style={{ width: '180px' }}
                    placeholder={'时间'}
                    format={this.props.format}
                    value={typeof (this.props.value) === 'string' ? dayjsTrans(this.props.value, this.props.format) : undefined}
                    onChange={(date: any, dateStr: string) => this.props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)}
                />
        )
    }

}