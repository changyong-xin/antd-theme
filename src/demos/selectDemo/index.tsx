import { Card, Switch } from 'antd';
import { OriSelect } from '../../lib/oriSelect';
import { useState } from 'react';

export function SelectDemo() {
    const [mode, setMode] = useState<"multiple" | "tags" | undefined>(undefined)
    return (
        <Card
            title='下拉选'
            extra={
                <div>
                    <span>{'多选模式'}</span>
                    <Switch
                        style={{ margin: "0px 8px" }}
                        defaultChecked={false}
                        onChange={(e) => {
                            setMode(e ? 'multiple' : undefined)
                        }}
                    />
                </div>
            }
        >
            <OriSelect
                placeholder='placeholder'
                width={200}
                mode={mode}
                options={[
                    { valuerow: '1', title: 'label1' },
                    { valuerow: '2', title: 'label2' },
                    { valuerow: '3', title: 'label3' },
                    { valuerow: '4', title: 'label4' },
                    { valuerow: '5', title: 'label5' },
                    { valuerow: '6', title: 'label6' },
                    { valuerow: '7', title: 'label7' },
                ]}
                fieldNames={{ label: 'title', value: 'valuerow' }}
            />
        </Card>
    )


}