import { OriDraggableList } from "../../lib";

export function ListDemo(props: any) {

    return (
        <OriDraggableList
            rowKey={'value'}
            listData={[
                { title: '1', value: '1' },
                { title: '2', value: '2' },
                { title: '3', value: '3' },
            ]}
            render={(item) =>
                <div style={{ width: '100%', padding: '8px' }}>
                    <span style={{ marginRight: '60px' }}>{item.title}</span>
                    <span>{item.value}</span>
                </div>
            }
        />
    )

}