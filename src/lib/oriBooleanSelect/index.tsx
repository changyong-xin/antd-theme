import { Radio } from "antd";
import { Select } from "antd/lib";

interface IOriBooleanSelect {
    value?: boolean
    onChange?: (value: boolean) => void;
    mode?: 'select' | 'radio';
    width?: number;
}

export function OriBooleanSelect(props: IOriBooleanSelect) {

    return (

        props.mode === 'radio' ?
            <Radio.Group
                style={{ width: props.width }}
                value={props.value}
                onChange={(e) => {
                    if (props.onChange) {
                        props.onChange(e.target.value)
                    }
                }}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
            </Radio.Group>
            :
            <Select
                value={props.value}
                onChange={(value) => {
                    if (props.onChange) {
                        props.onChange(value)
                    }
                }}
                style={{ width: props.width }}
                options={[
                    { value: true, label: '是' },
                    { value: false, label: '否' }
                ]}
            />

    )

}