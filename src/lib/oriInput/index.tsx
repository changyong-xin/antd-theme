import { Input } from 'antd';
import React from 'react';
import { OriGroupInput } from '../oriGroupInput';

interface IOriInput {
    isRange: boolean;
    allowClear: boolean;
    width: number;
    placeholder?: string;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export class OriInput extends React.Component<IOriInput, any>{

    public render() {
        return (
            this.props.isRange ?
                <OriGroupInput
                    allowClear={this.props.allowClear}
                    value={typeof (this.props.value) === 'object' ? this.props.value : undefined}
                    style={{ width: this.props.width }}
                    placeholder={this.props.placeholder ? [this.props.placeholder, this.props.placeholder] : undefined}
                    onChange={(value) => this.props.onChange!(value)}
                />
                :
                <Input
                    allowClear={this.props.allowClear}
                    style={{ width: this.props.width }}
                    placeholder={this.props.placeholder}
                    value={this.props.value ? this.props.value : undefined}
                    onChange={(e) => this.props.onChange!(e.target.value)}
                />
        )
    }

}