import { App } from 'antd';
import { StaticContext } from '../entity';

function Context() {
    const { message, notification, modal } = App.useApp();
    StaticContext.message = message;
    StaticContext.notification = notification;
    StaticContext.modal = modal;
    return <></>
}

export default function AppWrapper() {
    return (
        <App>
            <Context />
        </App>
    )
}
