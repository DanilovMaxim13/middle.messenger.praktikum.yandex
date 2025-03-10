function isPlainObject(value) {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isArrayOrObject(value) {
    return isPlainObject(value) || Array.isArray(value);
}

export function isEqual(lhs, rhs) {
    if (Array.isArray(lhs) && Array.isArray(rhs)) {
        if (lhs.length !== rhs.length) {
            return false;
        }

        for (let i = 0; i < lhs.length; i++) {
            const leftValue = lhs[i];
            const rightValue = rhs[i];

            if (isArrayOrObject(leftValue) && isArrayOrObject(rightValue)) {
                if (!isEqual(leftValue, rightValue)) {
                    return false;
                }
            } else if (leftValue !== rightValue) {
                return false;
            }
        }
        return true;
    }

    if (isPlainObject(lhs) && isPlainObject(rhs)) {
        if (Object.keys(lhs).length !== Object.keys(rhs).length) {
            return false;
        }

        for (const [key, value] of Object.entries(lhs)) {
            const rightValue = rhs[key];
            if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
                if (!isEqual(value, rightValue)) {
                    return false;
                }
            } else if (value !== rightValue) {
                return false;
            }
        }
        return true;
    }

    return false;
}
