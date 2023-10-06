import { Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FieldNames } from "rc-select/lib/Select";
import { useState } from "react";

declare type OriSelectValue = React.Key | React.Key[]

interface IOriSelect {
    fieldNames?: FieldNames
    options: AnyObject[];
    mode?: "multiple";
    value?: OriSelectValue;
    defaultValue?: OriSelectValue;
    width?: number;
    onChange?: (value: OriSelectValue) => void;
    placeholder?: string;
    allowClear?: boolean;
}

export function OriSelect(props: IOriSelect) {
    function getInitialLable(value: any) {
        let label;
        let labels: any[] = [];
        if (typeof (value) === 'string') {
            props.options.forEach((item) => {
                if (props.fieldNames && props.fieldNames.value) {
                    if (value === item[props.fieldNames.value]) {
                        if (props.fieldNames && props.fieldNames.label) {
                            label = item[props.fieldNames.label]
                        } else {
                            label = item.label
                        }
                    }
                } else {
                    if (value === item.value) {
                        if (props.fieldNames && props.fieldNames.label) {
                            label = item[props.fieldNames.label]
                        } else {
                            label = item.label
                        }
                    }
                }
            })
        } else {
            value.forEach((valueitem: any) => {
                props.options.forEach((item) => {
                    if (props.fieldNames && props.fieldNames.value) {
                        if (valueitem === item[props.fieldNames.value]) {
                            if (props.fieldNames && props.fieldNames.label) {
                                labels.push(item[props.fieldNames.label]);
                            } else {
                                labels.push(item.label);
                            }
                        }
                    } else {
                        if (valueitem === item.value) {
                            if (props.fieldNames && props.fieldNames.label) {
                                labels.push(item[props.fieldNames.label]);
                            } else {
                                labels.push(item.label);
                            }
                        }
                    }
                })
            })
            label = labels.toString();
        }
        return label
    }
    const [label, setLabel] = useState<string | undefined>(
        props.value
            ?
            getInitialLable(props.value)
            :
            props.defaultValue
                ?
                getInitialLable(props.defaultValue)
                :
                undefined
    )
    return (
        <Select<OriSelectValue, AnyObject>
            showSearch={false}
            fieldNames={props.fieldNames}
            allowClear={props.allowClear}
            placeholder={props.placeholder}
            mode={props.mode}
            value={props.value}
            defaultValue={props.defaultValue}
            style={{ width: (props.width && props.width > 80) ? props.width : 120, }}
            options={props.options}
            onChange={(value, options) => {
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
        />
    )

}