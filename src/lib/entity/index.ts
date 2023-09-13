import { MessageInstance } from "antd/es/message/interface";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { NotificationInstance } from "antd/es/notification/interface";

export class OridStore {
    identity: string = '';
}

export class StaticContext {

    public static message: MessageInstance;

    public static notification: NotificationInstance;

    public static modal: Omit<ModalStaticFunctions, 'warn'>;
}