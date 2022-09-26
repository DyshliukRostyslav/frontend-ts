declare const _default: {
    http: {
        client: {
            get: (resource: string, request?: import("../types/unknown-object").UnknownObject, options?: import("../http/models/request-options").RequestOptions | undefined) => Promise<import("../http/models/shared").SharedResponse>;
            post: (resource: string, request?: import("../types/unknown-object").UnknownObject, options?: import("../http/models/request-options").RequestOptions | undefined) => Promise<import("../http/models/shared").SharedResponse>;
            put: (resource: string, request?: import("../types/unknown-object").UnknownObject, options?: import("../http/models/request-options").RequestOptions | undefined) => Promise<import("../http/models/shared").SharedResponse>;
        };
    };
    features: typeof import("../features");
    sysSettings: typeof import("../sys-settings");
    processes: typeof import("../processes");
    rights: typeof import("../rights");
    rules: typeof import("../rules/business-rules");
};
export = _default;
