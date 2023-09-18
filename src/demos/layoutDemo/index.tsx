import React from 'react';
import { OriLayout } from '../../lib';
import { Button } from 'antd';
import { OriTableDemo } from '../tableDemo';

export class LayoutDemo extends React.Component<any, any>{

    public render() {
        return (
            <OriLayout
                orientation='vertical'
                topContent={<Button>新建</Button>}
                middleContent={<OriTableDemo />}
                middleStretch={true}
            />
        )
    }

}