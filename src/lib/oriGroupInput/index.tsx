import { Input } from 'antd';
import React, { CSSProperties } from 'react';
import './index.scss';

interface IOriGroupInput {
    style?: CSSProperties
    onChange?: (value: [string, string]) => void;
    value?: [string, string];
    placeholder?: [string, string];
    allowClear?: boolean;
}

export class OriGroupInput extends React.Component<IOriGroupInput, any>{

    public leftValue: string = '';

    public rightValue: string = '';

    public render() {
        return (
            <span style={this.props.style} className={'ori-groupinput'} >
                <Input
                    className="ori-groupinput-left"
                    value={this.props.value ? this.props.value[0] : undefined}
                    placeholder={this.props.placeholder ? this.props.placeholder[0] : undefined}
                    allowClear={this.props.allowClear}
                    onChange={this.onLeftInputChange}
                />
                <Input
                    className="ori-groupinput-middle"
                    placeholder="~"
                    disabled={true}
                />
                <Input
                    className="ori-groupinput-right"
                    value={this.props.value ? this.props.value[1] : undefined}
                    placeholder={this.props.placeholder ? this.props.placeholder[1] : undefined}
                    allowClear={this.props.allowClear}
                    onChange={this.onRightInputChange}
                />
            </span>
        )
    }


    public onLeftInputChange = (e: any) => {
        this.leftValue = e.target.value || '';
        if (this.props.onChange) {
            this.props.onChange([this.leftValue, this.rightValue]);
        }
    }


    public onRightInputChange = (e: any) => {
        this.rightValue = e.target.value || '';
        if (this.props.onChange) {
            this.props.onChange([this.leftValue, this.rightValue]);
        }
    }
}