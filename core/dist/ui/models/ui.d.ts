import { Guid } from '../../structures/guid';
export interface SetOptions {
    silent?: boolean;
    preventValidation?: boolean;
    skipValidation?: boolean;
}
export interface ValidationResult {
    invalidMessage: string;
}
export interface ModuleConfig {
    id?: string;
    renderTo?: string;
    keepAlive?: boolean;
    reload?: boolean;
}
export interface Lookup {
    value: Guid | string;
    displayValue: string;
}
export declare type NullableLookup = Lookup | null;
export interface SaveConfig {
    isSilent: boolean;
    callback: () => void;
    scope: any;
}
export declare enum CardState {
    VIEW = "view",
    ADD = "add",
    EDIT = "edit",
    COPY = "copy"
}
export interface MultiLookupConfig {
    entitySchemaName: string;
    columnName: string;
    captionLookup?: string;
}
export interface ValuePair {
    name: string;
    value: any;
}
export interface OpenLookupConfig {
    entitySchemaName?: string;
    filters?: any;
    multiSelect?: boolean;
    hideActions?: boolean;
    columns?: Array<string>;
    columnValue?: any;
    useRecordDeactivation?: boolean;
    searchValue?: string;
    actionsButtonVisible?: boolean;
    keepAlive?: boolean;
    lookupModuleId?: string | Guid;
    lookupPageName?: string;
    isQuickAdd?: boolean;
    valuePairs?: Array<ValuePair>;
    multiLookupConfig?: MultiLookupConfig;
}
export interface OpenLookupResult {
    selectedRows: any;
    columnName: string;
    filters: any;
    searchData: string;
    searchColumn: {
        value: string;
        displayValue: string;
    };
}
export interface DetailChangedArgs {
    action: CardState;
    rows: Array<string | Guid>;
}
export interface BindTo {
    bindTo: string | Function;
}
export interface ButtonMenuItemConfig {
    Id?: string | Guid;
    Caption?: BindTo | string;
    Click?: BindTo;
    Tag?: string | Guid;
    Enabled?: BindTo | boolean;
    Visible?: BindTo | boolean;
    MarkerValue?: string;
}
export interface UpdateDetailConfig {
    detail: string;
}
export interface ValidateColumnOption {
    skipValidation?: boolean;
}
export interface OpenMiniPageConfig {
    rowId?: Guid;
    columnName?: string;
    targetId?: Guid;
    entitySchemaName?: string;
    valuePairs?: Array<ValuePair>;
    viewModelClassName?: string;
    operation?: CardState;
    isFixed?: boolean;
    showDelay?: number;
    moduleId?: string;
}
export interface OpenCardInChainConfig {
    entitySchemaName?: string;
    schemaName?: string;
    operation?: CardState;
    moduleId?: string;
    defaultValues?: Array<ValuePair>;
    instanceConfig: {
        useSeparatedPageHeader: string;
    };
    isLinkClick?: boolean;
    stateObj?: Object;
    isSeparateMode?: boolean;
    id?: Guid;
    silent?: boolean;
    moduleName?: string;
    renderTo?: string;
    keepAlive?: boolean;
}
