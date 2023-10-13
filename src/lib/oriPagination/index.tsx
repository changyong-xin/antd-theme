import { CaretUpOutlined } from '@ant-design/icons';
import { Button, Menu, Pagination, Popover } from 'antd';
import './index.scss';

export interface IOriPagination {
    size: number;
    index: number;
    onChange: (index: number, size: number) => void;
    total: number;
    sizeConfig?: number[];
    addOnBefore?: React.ReactNode;
}

export function OriPagination(props: IOriPagination) {

    return (
        <div className='ori-pagination'>
            <div style={{ display: "flex", alignItems: "center" }}>
                {props.addOnBefore}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 8 }}>
                    总计:
                    <span style={{ fontWeight: 600, margin: '0px 8px' }}>
                        {props.total}
                    </span>
                    条
                </span>
                <Popover
                    placement='top'
                    content={<div>
                        <Menu
                            className='ori-pagination-menu'
                            theme='light'
                            selectedKeys={[String(props.size)]}
                            onSelect={(info) => {
                                props.onChange(1, Number(info.key))
                            }}
                            items={
                                [...[10, 20, 30, 50, 100, 200], ...(props.sizeConfig || [])].map((item) => {
                                    return {
                                        label: <span style={{ width: '40px' }}>{item}</span>,
                                        key: item.toString(),
                                    }
                                })
                            }

                        />
                    </div>
                    }
                >
                    <Button size="small" >
                        每页 <span style={{ width: '30px' }}> {props.size}</span> 条 <CaretUpOutlined />
                    </Button>
                </Popover>
                <Pagination
                    current={props.index}
                    onChange={props.onChange}
                    pageSize={props.size}
                    simple={true}
                    total={props.total}
                />
            </div>
        </div>
    )
}