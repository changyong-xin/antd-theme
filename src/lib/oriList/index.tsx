import { List } from "antd";
import { AnyObject } from "antd/es/_util/type";

interface IOriList<T> {
    data: T[];
    render: (item: T) => React.ReactNode
}

export function OriList<T = AnyObject>(props: IOriList<T>) {

    return (
        <List>
            {
                props.data.map((item, index) => <List.Item key={index}>{props.render(item)}</List.Item>)
            }
        </List>
    )

}