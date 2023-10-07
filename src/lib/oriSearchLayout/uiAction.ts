import { OriSearchLayoutUiStore } from "./uiStore";

export class OriSearchLayoutUiAction<T, Q, S extends OriSearchLayoutUiStore<T> = OriSearchLayoutUiStore<T>>{

    public uiStore: S

    constructor(store: S) {
        this.uiStore = store;
        this.onSearch = this.onSearch.bind(this)
    }

    public onSearch(value: Q) {
        console.log(value)
    }

    public onFieldsChange(name: string, value: any) {
        console.log(name, value)
    }

    public onPaginationChange(index: number, size: number) {
        console.log(index, size)
        this.uiStore.pageIndex = index;
        this.uiStore.pageSize = size;
        this.uiStore.totalCount = 0;
        this.uiStore.dataSource = [];
    }

    // antd警告，index作为rowKey可能存在问题
    public getRowKey(record: T, index?: number) {
        return index ? index.toString() : ''
    }
}
