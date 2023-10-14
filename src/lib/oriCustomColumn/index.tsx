import { CaretDownFilled, CaretUpFilled, SettingOutlined } from '@ant-design/icons';
import { Modal, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface IOriCustomColumn<T> {
    columns: ColumnsType<T>
    onOk: (columns?: ColumnsType<T>) => void
}

export function OriCustomColumn<T>(props: IOriCustomColumn<T>) {
    const [open, setOpen] = React.useState(false);
    const [columns, setColumns] = React.useState(props.columns);
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
                    props.onOk(columns)
                }}
            >
                <div>
                    <div>
                        默认排序顺序：
                        {
                            columns.filter((item) => item.sortOrder)
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
                </div>
            </Modal>
        </React.Fragment>
    )
}

