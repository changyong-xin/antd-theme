import { CaretDownFilled, CaretUpFilled, LockFilled, SettingOutlined, UnlockFilled } from '@ant-design/icons';
import { Col, Form, FormInstance, Input, Modal, Row, Select, Switch, Tag } from 'antd';
import React, { useRef } from 'react';
import { ICustomEdit } from '../interface';
import { OriDraggableList } from '../oriDraggableList';

interface IOriCustomColumn {
    columns: ICustomEdit[]
    onOk: (columns: ICustomEdit[]) => void
}

function OriCustomColumnItem(props: { value?: string; onChange?: (value?: string) => void }) {
    const item: ICustomEdit = JSON.parse(props.value!)
    return (
        <Row>
            <Col span={4} style={{ padding: "0px 4px" }}>{item.title as any}</Col>
            <Col span={4} style={{ padding: "0px 4px" }}>
                <Switch
                    checked={item.className !== 'ori-table-hidden-col'}
                    onChange={(checked) => {
                        checked === true ?
                            item.className = undefined
                            :
                            item.className = 'ori-table-hidden-col';
                        props.onChange!(JSON.stringify(item));
                    }}
                />
            </Col>
            <Col span={4} style={{ padding: "0px 4px" }}>
                {item.fixed === true ? <LockFilled /> : <UnlockFilled />}
            </Col>
            <Col span={4} style={{ padding: "0px 4px" }}>
                <Input
                    value={typeof (item.width) === 'string' ? item.width.split('px')[0] : item.width}
                    style={{ width: "60px" }}
                    onChange={(e) => {
                        (isNaN(Number(e.target.value)) || Number(e.target.value) < 50)
                            ?
                            item.width = '50px'
                            :
                            item.width = e.target.value + 'px';
                        props.onChange!(JSON.stringify(item));
                    }}
                />
                <span style={{ lineHeight: '32px', marginLeft: '4px' }}>px</span>
            </Col>
            <Col span={4} style={{ padding: "0px 4px" }}>
                <Switch
                    checked={item.sorter === true}
                    onChange={(checked) => {
                        item.sorter = checked;
                        props.onChange!(JSON.stringify(item));
                    }}
                />
            </Col>
            <Col span={4} style={{ padding: "0px 4px" }}>
                <Select
                    allowClear={true}
                    style={{ width: '80px' }}
                    disabled={item.sorter !== true}
                    options={
                        [
                            { value: 'ascend', label: '升序', },
                            { value: 'descend', label: '降序', }
                        ]
                    }
                    value={item.sortOrder}
                    onChange={(value) => {
                        item.sortOrder = value;
                        props.onChange!(JSON.stringify(item));
                    }}
                />
            </Col>
        </Row>
    )

}

function OriCustomColumnEdit(props: { columns: ICustomEdit[]; form?: React.RefObject<FormInstance>; }) {

    return (
        <div>
            <div>
                默认排序顺序：
                {
                    props.columns.filter((item) => item.sortOrder)
                        .map((item, index) =>
                            <Tag key={index}>
                                {
                                    typeof (item.title) === 'function'
                                        ?
                                        <></>
                                        :
                                        item.title
                                }
                                {
                                    item.sortOrder === 'descend'
                                        ?
                                        <CaretDownFilled /> :
                                        item.sortOrder === 'ascend'
                                            ?
                                            <CaretUpFilled />
                                            :
                                            <></>
                                }
                            </Tag>
                        )
                }
            </div>
            <div>
                <Row>
                    <Col span={4}>列名称</Col>
                    <Col span={4}>显示</Col>
                    <Col span={4}>锁定</Col>
                    <Col span={4}>宽度</Col>
                    <Col span={4}>允许排序</Col>
                    <Col span={4}>默认排序</Col>
                </Row>
                <Form
                    ref={props.form}
                    onFieldsChange={(fields) => {
                        fields.forEach((field) => {
                            if (props.form && props.form.current) {
                                props.form.current.setFieldValue(field.name[0], field.value)
                            }
                        })
                    }}>
                    <OriDraggableList
                        rowKey={'dataIndex'}
                        listData={props.columns}
                        onChange={(columns) => console.log(columns)}
                        render={
                            (item, index) => <Form.Item style={{ margin: '8px 0px' }} initialValue={JSON.stringify(item)} name={String(item.dataIndex)}>
                                <OriCustomColumnItem />
                            </Form.Item>
                        }
                    />
                </Form>
            </div>
        </div>
    )
}

export function OriCustomColumn(props: IOriCustomColumn) {
    const [open, setOpen] = React.useState(false);
    const form = useRef<FormInstance>(null);
    return (
        <React.Fragment>
            <SettingOutlined onClick={() => setOpen(true)} />
            <Modal
                width={800}
                open={open}
                title={'自定义显示列'}
                destroyOnClose={true}
                okText={'确定'}
                cancelText={'恢复默认设置'}
                onCancel={() => {
                    setOpen(false)
                }}
                onOk={() => {
                    setOpen(false)
                    const fields = form.current?.getFieldsValue()!;
                    const result: ICustomEdit[] = [];
                    Object.keys(fields).forEach((key) => {
                        result.push(JSON.parse(fields[key]))
                    })
                    props.onOk(result)
                }}
            >
                <OriCustomColumnEdit columns={props.columns} form={form} />
            </Modal>
        </React.Fragment>
    )
}

