import { Input } from 'antd';
import { OriGroupInput } from '../oriGroupInput';

interface IOriInput {
    isRange: boolean;
    allowClear: boolean;
    width: number;
    placeholder?: string;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export function OriInput(props: IOriInput) {

    return (
        props.isRange ?
            <OriGroupInput
                allowClear={props.allowClear}
                value={typeof (props.value) === 'object' ? props.value : undefined}
                style={{ width: props.width }}
                placeholder={props.placeholder ? [props.placeholder, props.placeholder] : undefined}
                onChange={(value) => props.onChange!(value)}
            />
            :
            <Input
                allowClear={props.allowClear}
                style={{ width: props.width }}
                placeholder={props.placeholder}
                value={props.value ? props.value : undefined}
                onChange={(e) => props.onChange!(e.target.value)}
            />
    )

}