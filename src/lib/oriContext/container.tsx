import { App } from "antd";
import { OriContext } from ".";

function Context(props: { children?: React.ReactNode }) {
    const { message, notification, modal } = App.useApp();
    OriContext.message = message;
    OriContext.notification = notification;
    OriContext.modal = modal;
    return props.children
}

export function ContextContainer(props: { children?: React.ReactNode }) {
    return <App>
        <Context>
            {props.children}
        </Context>
    </App>
}