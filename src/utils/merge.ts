//@ts-nocheck
export function merge(lhs, rhs) {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (
                typeof rhs[p] === 'object' &&
                rhs[p] !== null &&
                rhs[p].constructor === Object
            ) {
                rhs[p] = merge(lhs[p], rhs[p]);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            console.error(e);
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}
