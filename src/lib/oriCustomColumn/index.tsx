import { CaretDownFilled, CaretUpFilled, LockFilled, SettingOutlined, UnlockFilled } from '@ant-design/icons';
import { Button, Col, Form, FormInstance, Input, Modal, Row, Select, Switch, Tag, theme } from 'antd';
import React, { useRef } from 'react';
import { ICustomEdit } from '../interface';
import { OriDraggableList } from '../oriDraggableList';
import { copyObj } from '../utils';

interface IOriCustomColumn {
    onReset: () => void;
    columns: ICustomEdit[];
    onOk: (columns: ICustomEdit[]) => void;
}

function OriCustomColumnItem(props: { value?: string; onChange?: (value?: string) => void }) {
    const item: ICustomEdit = JSON.parse(props.value!)
    return (
        <Row style={{ padding: '4px 0px', borderBottom: "1px solid #e9e9e9" }}>
            <Col span={4} style={{ padding: "0px 4px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title as any}</Col>
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

function OriCustomColumnEdit(props: { columns: ICustomEdit[]; onOk: (columns: ICustomEdit[]) => void; onReset: () => void; }) {
    const form = useRef<FormInstance>(null);
    const colRef = useRef<ICustomEdit[]>(copyObj(props.columns));
    return (
        <div>
            <div>
                默认排序顺序：
                {
                    colRef.current.filter((item) => item.sortOrder)
                        .map((item, index) =>
                            <Tag key={index}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <span>{item.title}</span>
                                    </div>
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
                                </div>
                            </Tag>
                        )
                }
            </div>
            <div>
                <Row style={{ margin: '8px 0px 0px 0px', padding: '0px 0px 4px 0px', borderBottom: "1px solid #e9e9e9" }}>
                    <Col span={4} style={{ padding: '0px 4px' }}>列名称</Col>
                    <Col span={4} style={{ padding: '0px 4px' }}>显示</Col>
                    <Col span={4} style={{ padding: '0px 4px' }}>锁定</Col>
                    <Col span={4} style={{ padding: '0px 4px' }}>宽度</Col>
                    <Col span={4} style={{ padding: '0px 4px' }}>允许排序</Col>
                    <Col span={4} style={{ padding: '0px 4px' }}>默认排序</Col>
                </Row>
                <Form
                    ref={form}
                    onFieldsChange={(fields) => {
                        fields.forEach((field) => {
                            if (form.current) {
                                form.current.setFieldValue(field.name[0], field.value)
                            }
                        })
                    }}>
                    <OriDraggableList
                        rowKey={'dataIndex'}
                        listData={colRef.current}
                        onChange={(columns) => colRef.current = columns}
                        render={
                            (item, index) => <Form.Item style={{ margin: '4px 0px' }} initialValue={JSON.stringify(item)} name={String(item.dataIndex)}>
                                <OriCustomColumnItem />
                            </Form.Item>
                        }
                    />
                </Form>
            </div>
            <div style={{ marginTop: '12px', textAlign: "right" }} >
                <Button
                    onClick={() => {
                        props.onReset()
                    }}
                >
                    恢复默认设置
                </Button>
                <Button
                    style={{ marginLeft: "8px" }}
                    type='primary'
                    onClick={
                        () => {
                            const fields = form.current?.getFieldsValue()!;
                            const result: ICustomEdit[] = [];
                            colRef.current.forEach((item) => {
                                result.push(JSON.parse(fields[String(item.dataIndex)]))
                            })
                            colRef.current = result
                            props.onOk(result)
                        }
                    }
                >
                    确定
                </Button>
            </div>
        </div>
    )
}

export function OriCustomColumn(props: IOriCustomColumn) {
    const token = theme.useToken();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <SettingOutlined onClick={() => setOpen(true)} style={{ color: token.token.colorPrimary }} />
            <Modal
                className='ori-modal-customfooter'
                width={800}
                open={open}
                title={'自定义显示列'}
                destroyOnClose={true}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={<></>}
            >
                <OriCustomColumnEdit
                    columns={props.columns}
                    onOk={(columns) => {
                        setOpen(false);
                        props.onOk(columns);
                    }}
                    onReset={() => {
                        setOpen(false);
                        props.onReset();
                    }}
                />
            </Modal>
        </React.Fragment>
    )
}

