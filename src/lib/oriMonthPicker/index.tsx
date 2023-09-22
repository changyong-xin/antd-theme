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

interface IOriMonthPickerState {
    open: boolean;
    value?: string | [string, string];
}

export class OriMonthPicker extends React.Component<IOriMonthPicker, IOriMonthPickerState>{

    private _selectValue: [string | undefined, string | undefined] = [undefined, undefined];

    constructor(props: IOriMonthPicker) {
        super(props)
        this.state = {
            open: false,
            value: undefined
        }
    }

    public render() {
        return (
            this.props.isRange ?
                <DatePicker.RangePicker
                    picker='month'
                    allowClear={this.props.allowClear}
                    value={typeof (this.props.value) === 'object' ? [dayjsTrans(this.props.value[0], this.props.format), dayjsTrans(this.props.value[1], this.props.format)] : undefined}
                    format={this.props.format}
                    style={{ width: '200px' }}
                    placeholder={['开始账期', '结束账期']}
                    onChange={(date: any, dateStr) => this.props.onChange!(dateStr[0] && dateStr[0].length > 0 ? dateStr : undefined)}
                    onPanelChange={
                        (value, mode) => {
                            if (mode[0] === 'date') {
                                this._selectValue[0] = dayjs(value ? value[0] : undefined).format(this.props.format)
                            }
                            if (mode[1] === 'date') {
                                this._selectValue[1] = dayjs(value ? value[1] : undefined).format(this.props.format)
                            }
                            if (this._selectValue[0] && this._selectValue[1]) {
                                if (this.props.onChange) {
                                    this.props.onChange(this._selectValue as [string, string])
                                }
                                this.setState({
                                    open: false
                                }, () => {
                                    this._selectValue = [undefined, undefined];
                                })
                            }
                        }
                    }
                    open={this.state.open}
                    onOpenChange={(status) => this.setState({ open: status })}
                    onMouseLeave={() => { this._selectValue = [undefined, undefined] }}
                />
                :
                <DatePicker.MonthPicker
                    allowClear={this.props.allowClear}
                    style={{ width: '120px' }}
                    placeholder={'账期'}
                    format={this.props.format}
                    value={typeof (this.props.value) === 'string' ? dayjsTrans(this.props.value, this.props.format) : undefined}
                    onChange={(date: any, dateStr: string) => this.props.onChange!(dateStr && dateStr.length > 0 ? dateStr : undefined)}
                />
        )
    }
}