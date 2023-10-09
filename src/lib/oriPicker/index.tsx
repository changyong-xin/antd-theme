import { OriDatePicker, OriMonthPicker, OriTimePicker } from "..";

declare type OriPickerFormat = 'YYYYMM' | 'YYYY-MM' | 'YYYY-MM-DD' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH:mm:ss';

interface IOriPicker {
    isRange: boolean;
    format: OriPickerFormat;
    allowClear: boolean;
    value?: string | [string, string];
    onChange?: (value?: string | [string, string]) => void;
}

export function OriPicker(props: IOriPicker) {
    switch (props.format) {
        case 'YYYYMM':
            return <OriMonthPicker {...props} />;
        case 'YYYY-MM':
            return <OriMonthPicker {...props} />;
        case 'YYYY-MM-DD':
            return <OriDatePicker {...props} />;
        case 'YYYY-MM-DD HH':
            return <OriTimePicker {...props} />;
        case 'YYYY-MM-DD HH:mm':
            return <OriTimePicker {...props} />;
        case 'YYYY-MM-DD HH:mm:ss':
            return <OriTimePicker {...props} />;

    }
}