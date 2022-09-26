import { Guid } from './structures/guid';
import { Lookup } from './ui/models/ui';
export declare type CurrentUser = Lookup & {
    account: Lookup;
    contact: Lookup;
    culture: Lookup;
    roles: Array<Guid>;
};
export declare const CURRENT_USER: CurrentUser;
