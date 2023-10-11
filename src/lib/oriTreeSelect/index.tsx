import { TreeSelect } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FieldNames } from "rc-tree-select/lib/TreeSelect";
import { useState } from "react";

declare type OriSelectValue = React.Key | React.Key[]

interface IOriTreeSelect {
    fieldNames?: FieldNames
    treeData: AnyObject[];
    multiple?: boolean;
    value?: OriSelectValue;
    defaultValue?: OriSelectValue;
    width?: number;
    onChange?: (value: OriSelectValue) => void;
    placeholder?: string;
    allowClear?: boolean;
    treeDefaultExpandAll?: boolean;
}

export function OriTreeSelect(props: IOriTreeSelect) {
    function getInitialLable(value: OriSelectValue, source: AnyObject[], labels: any[]) {
        source.forEach((item) => {
            const children = (props.fieldNames && props.fieldNames.children) ? item[props.fieldNames.children] : item.children;
            if ((Array.isArray(value) ? value : [value]).find((valueitem) => valueitem === (
                props.fieldNames && props.fieldNames.value ? item[props.fieldNames.value] : item.value
            ))) {
                labels.push(
                    children && children.length > 0 ?
                        children.map((childrenIitem: any) => (
                            props.fieldNames && props.fieldNames.label)
                            ?
                            childrenIitem[props.fieldNames.label]
                            :
                            childrenIitem.label
                        )
                        :
                        props.fieldNames && props.fieldNames.label ? item[props.fieldNames.label] : item.label
                );
            } else if (children && children.length > 0) {
                getInitialLable(value, children, labels)
            }
        })
        return labels
    }
    const [label, setLabel] = useState<string | undefined>(
        props.value
            ?
            getInitialLable(props.value, props.treeData, []).toString()
            :
            props.defaultValue
                ?
                getInitialLable(props.defaultValue, props.treeData, []).toString()
                :
                undefined
    )
    return (
        <TreeSelect<OriSelectValue, AnyObject>
            treeDefaultExpandAll={props.treeDefaultExpandAll}
            showSearch={false}
            fieldNames={props.fieldNames}
            allowClear={props.allowClear}
            placeholder={props.placeholder}
            multiple={props.multiple}
            treeCheckable={props.multiple}
            value={props.value}
            defaultValue={props.defaultValue}
            style={{ width: (props.width && props.width > 80) ? props.width : 120, }}
            treeData={props.treeData}
            onChange={(value, labels) => {
                console.log(value)
                if (props.onChange) {
                    props.onChange(value)
                }
                if (Array.isArray(labels)) {
                    setLabel(labels.toString())
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