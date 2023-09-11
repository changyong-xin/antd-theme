import React from 'react';

export class Demo2 extends React.Component<any, any>{

    constructor(props: any) {
        super(props)
        console.log(this.props.OridStore)
    }

    public render() {
        console.log('render')
        return (
            <div>Demo2</div>
        )
    }

}