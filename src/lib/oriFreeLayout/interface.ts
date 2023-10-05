

export declare type OriFreeLayoutStatus = 'edit' | 'view';
export declare type OriFreeLayoutGutter = 8 | 16 | 24;

export interface IOriFreeLayoutCellProfile {
    height: number;
    width: number;
    top: number;
    left: number;
}

export interface IOriFreeLayoutCellContent extends IOriFreeLayoutCellProfile {
    name: string;
    minHeight?: number;
    minWidth?: number;
}
