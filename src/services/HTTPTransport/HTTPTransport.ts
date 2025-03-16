export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method?: METHODS;
    data?: unknown;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export class HTTPTransport {
    queryStringify = (data: Record<string, unknown>): string => {
        return (
            '?' +
            Object.entries(data)
                .map(
                    ([key, value]) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
                )
                .join('&')
        );
    };

    get: HTTPMethod = (url, options = {}) => {
        const query =
            options.data && typeof options.data === 'object'
                ? this.queryStringify(options.data as Record<string, unknown>)
                : '';
        return this.request(url + query, { ...options, method: METHODS.GET });
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request: HTTPMethod = (url, options = { method: METHODS.GET }) => {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            if (method) {
                xhr.open(method, `https://ya-praktikum.tech/api/v2${url}`);
            }

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(
                    data instanceof FormData ? data : JSON.stringify(data)
                );
            }
        });
    };
}
