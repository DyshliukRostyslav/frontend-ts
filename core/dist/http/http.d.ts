import { SharedResponse } from './models/shared';
import { UnknownObject } from '../types/unknown-object';
import { RequestOptions } from './models/request-options';
export declare const getCreatioUrl: () => any;
export declare const get: (resource: string, request?: UnknownObject, options?: RequestOptions) => Promise<SharedResponse>;
export declare const post: (resource: string, request?: UnknownObject, options?: RequestOptions) => Promise<SharedResponse>;
export declare const put: (resource: string, request?: UnknownObject, options?: RequestOptions) => Promise<SharedResponse>;
