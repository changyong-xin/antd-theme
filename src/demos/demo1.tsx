import { DatePicker } from 'antd';
import React from 'react';

export class Demo1 extends React.Component<any, any>{

    constructor(props: any) {
        super(props)
        console.log(this.props.OridStore)
    }

    public render() {
        return (
            <div>Demo1</div>
        )
    }

}

export function DateDemo() {
    return <DatePicker
        showTime={true}
        allowClear={true}
        style={{ width: '180px' }}
        placeholder={'时间'}
        format={'YYYY-MM-DD'}
        onChange={(date, dateStr) => console.log(dateStr)}
    />
}