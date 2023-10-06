import { Card } from 'antd';
import { OriSelect } from '../../lib/oriSelect';

export function SelectDemo() {

    return (
        <div>
            <Card
                title='下拉选'
            >
                <OriSelect
                    placeholder={'多选'}
                    width={200}
                    mode={'multiple'}
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
                <OriSelect
                    placeholder={'单选'}
                    width={200}
                    options={[
                        { value: '1', label: 'label1' },
                        { value: '2', label: 'label2' },
                        { value: '3', label: 'label3' },
                        { value: '4', label: 'label4' },
                        { value: '5', label: 'label5' },
                        { value: '6', label: 'label6' },
                        { value: '7', label: 'label7' },
                    ]}
                />
            </Card>
            <Card
                title='树选择器'
            >
                <OriSelect
                    placeholder={'多选'}
                    width={200}
                    mode={'multiple'}
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
                <OriSelect
                    placeholder={'单选'}
                    width={200}
                    options={[
                        { value: '1', label: 'label1' },
                        { value: '2', label: 'label2' },
                        { value: '3', label: 'label3' },
                        { value: '4', label: 'label4' },
                        { value: '5', label: 'label5' },
                        { value: '6', label: 'label6' },
                        { value: '7', label: 'label7' },
                    ]}
                />
            </Card>
        </div>
    )


}