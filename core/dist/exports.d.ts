import * as businessRules from './rules/business-rules';
import * as features from './features';
import * as sysSettings from './sys-settings';
import * as processes from './processes';
import * as rights from './rights';
export declare const getCoreExports: () => {
    http: {
        client: {
            get: (resource: string, request?: import("./types/unknown-object").UnknownObject, options?: import("./http/models/request-options").RequestOptions | undefined) => Promise<import("./http/models/shared").SharedResponse>;
            post: (resource: string, request?: import("./types/unknown-object").UnknownObject, options?: import("./http/models/request-options").RequestOptions | undefined) => Promise<import("./http/models/shared").SharedResponse>;
            put: (resource: string, request?: import("./types/unknown-object").UnknownObject, options?: import("./http/models/request-options").RequestOptions | undefined) => Promise<import("./http/models/shared").SharedResponse>;
        };
    };
    features: typeof features;
    sysSettings: typeof sysSettings;
    processes: typeof processes;
    rights: typeof rights;
    rules: typeof businessRules;
};
