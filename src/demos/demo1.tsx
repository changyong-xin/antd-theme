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