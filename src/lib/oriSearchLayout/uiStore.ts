import { makeObservable, observable } from 'mobx';

export class OriSearchLayoutUiStore<T>{

    constructor() {
        makeObservable(this, {
            dataSource: observable,
            loading: observable,
            pageIndex: observable,
            pageSize: observable,
            selectedRowKeys: observable,
            totalCount: observable,
        })
    }

    public dataSource: T[] = [];

    public loading: boolean = false;

    public pageIndex: number = 0;

    public pageSize: number = 20;

    public selectedRowKeys: React.Key[] = [];

    public selectedRows: T[] = [];

    public totalCount: number = 0;

}