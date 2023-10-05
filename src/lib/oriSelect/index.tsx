import { Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FieldNames } from "rc-select/lib/Select";
import { useState } from "react";

declare type OriSelectValue = React.Key | React.Key[]

interface IOriSelect {
    fieldNames?: FieldNames
    options: AnyObject[];
    mode?: "multiple" | "tags";
    value?: OriSelectValue;
    width?: number;
    onChange?: (value: OriSelectValue) => void;
    placeholder?: string;
}

export function OriSelect(props: IOriSelect) {
    const [label, setLabel] = useState<string | undefined>(undefined)
    return (
        <Select<OriSelectValue, AnyObject>
            fieldNames={props.fieldNames}
            allowClear={true}
            placeholder={props.placeholder}
            mode={props.mode}
            value={props.value}
            style={{ width: (props.width && props.width > 80) ? props.width : 80, }}
            className={"ori-select"}
            options={props.options}
            onChange={(value, options) => {
                console.log(value, options)
                if (props.onChange) {
                    props.onChange(value)
                }
                if (Array.isArray(options)) {
                    setLabel(options.map((item) => {
                        if (props.fieldNames && props.fieldNames.label) {
                            return item[props.fieldNames['label']]
                        } else {
                            return item.label
                        }
                    }
                    ).toString())
                }
            }}
            maxTagCount={0}
            maxTagPlaceholder={
                <div
                    style={{
                        maxWidth: (props.width && props.width > 80) ? props.width - 60 : 20,
                        overflow: "hidden",
                        textOverflow: 'ellipsis'
                    }}
                >
                    <span title={label}>{label}</span>
                </div>
            }
            maxTagTextLength={2}
        />
    )

}