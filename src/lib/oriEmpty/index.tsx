import React, { ReactNode } from 'react';

interface IOriEmptyProps {
    style?: React.CSSProperties;
    className?: string,
    decription?: string | ReactNode;
    type?: "chart" | "default" | "blank" | "primary",
    size?: "xs" | "md" | "lg",
}

const ImageList = {
    "default": require("./image/default.png"),
    "blank": require("./image/blank.png"),
    "primary": require("./image/primary.png"),
    "chart": require("./image/chart.png"),

}

const ImageSize = {
    "xs": { width: "48px", height: "48px" },
    "md": { width: "64px", height: "64px" },
    "lg": { width: "96px", height: "96px" },
}

function selectImageType(type: string): any {
    switch (type) {
        case "blank":
            return ImageList.blank;
        case "chart":
            return ImageList.chart;
        case "default":
            return ImageList.default;
        case "primary":
            return ImageList.primary;
        default:
            return ImageList.default;
    }
}

function selectImamgeSize(size: string): any {
    if (size) {
        switch (size) {
            case "xs":
                return ImageSize.xs;
            case "md":
                return ImageSize.md;
            case "lg":
                return ImageSize.lg;
            default:
                return ImageSize.md;
        }
    }
    return ImageSize.md;
}

export function OriEmpty(props: IOriEmptyProps) {

    return (
        <div>
            <img
                alt=''
                src={selectImageType(props.type || "default")}
                style={selectImamgeSize(props.size || 'md')}
            />
            <p>
                {props.decription || "暂无数据"}
            </p>
        </div>
    )
}