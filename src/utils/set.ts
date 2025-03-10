//@ts-nocheck
import { merge } from './merge';

export function set(object, path: string, value) {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const result = path
        .split('.')
        .reduceRight((acc, key) => ({ [key]: acc }), value);

    return merge(object, result);
}
