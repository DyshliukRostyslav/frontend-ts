import { Mask } from '../../structures/mask';
export interface RequestOptions {
    headers?: Headers;
    mask?: Mask;
    isAbsolute?: boolean;
}
