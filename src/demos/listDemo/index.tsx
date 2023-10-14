import { OriList } from "../../lib";

export function ListDemo(props: any) {

    return (
        <div>
            <OriList
                data={[
                    { title: '1', value: '1' },
                    { title: '2', value: '2' },
                    { title: '3', value: '3' },
                ]}
                render={(item) => <div style={{ width: '100%', padding: '16px', border: "1px solid #999" }}><span style={{ marginRight: '60px' }}>{item.title}</span><span>{item.value}</span></div>}
            />
        </div>
    )

}