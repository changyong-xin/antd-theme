import { MessageInstance } from "antd/es/message/interface";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { NotificationInstance } from "antd/es/notification/interface";
import { ContextContainer } from "./container";


export class OriContext {

    public static openTab: (key: string, params?: any) => void;

    public static message: MessageInstance;

    public static notification: NotificationInstance;

    public static modal: Omit<ModalStaticFunctions, 'warn'>;

    public static Container = ContextContainer

}