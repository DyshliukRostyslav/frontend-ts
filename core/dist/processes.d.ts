import { Guid } from './structures/guid';
import { ErrorInfo } from './types/errors';
export interface ProcessRequest {
    sysProcessName?: string;
    sysProcessId?: Guid | string;
    parameters?: object;
    resultParameters?: Array<string>;
}
export interface ProcessByIdRequest {
    sysProcessId: Guid | string;
    sysProcessName?: string;
    parameters?: object;
    resultParameters?: Array<string>;
}
export interface ProcessResponse {
    success: boolean;
    resultParameterValues?: object;
    errorInfo?: ErrorInfo;
}
export declare const executeProcess: (config: ProcessRequest) => Promise<ProcessResponse>;
export declare const executeProcessById: (config: ProcessByIdRequest) => Promise<ProcessResponse>;
