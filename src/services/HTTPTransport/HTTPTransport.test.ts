import { HTTPTransport, METHODS } from './HTTPTransport';

describe('HTTPTransport', () => {
    let http: HTTPTransport;
    let xhrMock: any;
    let originalXHR: typeof XMLHttpRequest;

    beforeEach(() => {
        http = new HTTPTransport();
        xhrMock = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            onload: jest.fn(),
            onerror: jest.fn(),
            onabort: jest.fn(),
            ontimeout: jest.fn(),
            readyState: 4,
            status: 200,
            responseText: '{}',
        };

        originalXHR = global.XMLHttpRequest;
        global.XMLHttpRequest = jest.fn(() => xhrMock as XMLHttpRequest) as any;
    });

    afterEach(() => {
        global.XMLHttpRequest = originalXHR;
        jest.clearAllMocks();
    });

    it('should send GET request with query string', async () => {
        const url = '/test';
        const data = { key: 'value' };

        const promise = http.get(url, { data });

        xhrMock.onload?.({} as ProgressEvent);

        await promise;

        expect(xhrMock.open).toHaveBeenCalledWith(
            METHODS.GET,
            `https://ya-praktikum.tech/api/v2${url}?key=value`
        );
        expect(xhrMock.send).toHaveBeenCalled();
    });

    it('should send POST request with data', async () => {
        const url = '/test';
        const data = { key: 'value' };

        const promise = http.post(url, { data });

        xhrMock.onload?.({} as ProgressEvent);

        await promise;

        expect(xhrMock.open).toHaveBeenCalledWith(
            METHODS.POST,
            `https://ya-praktikum.tech/api/v2${url}`
        );
        expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(
            'Content-Type',
            'application/json'
        );
        expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should send PUT request with data', async () => {
        const url = '/test';
        const data = { key: 'value' };

        const promise = http.put(url, { data });

        xhrMock.onload?.({} as ProgressEvent);

        await promise;

        expect(xhrMock.open).toHaveBeenCalledWith(
            METHODS.PUT,
            `https://ya-praktikum.tech/api/v2${url}`
        );
        expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(
            'Content-Type',
            'application/json'
        );
        expect(xhrMock.send).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should send DELETE request', async () => {
        const url = '/test';

        const promise = http.delete(url);

        xhrMock.onload?.({} as ProgressEvent);

        await promise;

        expect(xhrMock.open).toHaveBeenCalledWith(
            METHODS.DELETE,
            `https://ya-praktikum.tech/api/v2${url}`
        );
        expect(xhrMock.send).toHaveBeenCalled();
    });

    it('should handle FormData without setting Content-Type header', async () => {
        const url = '/test';
        const data = new FormData();

        const promise = http.post(url, { data });

        xhrMock.onload?.({} as ProgressEvent);

        await promise;

        expect(xhrMock.open).toHaveBeenCalledWith(
            METHODS.POST,
            `https://ya-praktikum.tech/api/v2${url}`
        );
        expect(xhrMock.setRequestHeader).not.toHaveBeenCalledWith(
            'Content-Type',
            'application/json'
        );
        expect(xhrMock.send).toHaveBeenCalledWith(data);
    });

    it('should reject on error', async () => {
        const url = '/test';

        const promise = http.get(url);

        xhrMock.onerror?.({} as ProgressEvent);

        await expect(promise).rejects.toBeDefined();
    });

    it('should reject on abort', async () => {
        const url = '/test';

        const promise = http.get(url);

        xhrMock.onabort?.({} as ProgressEvent);

        await expect(promise).rejects.toBeDefined();
    });

    it('should reject on timeout', async () => {
        const url = '/test';

        const promise = http.get(url);

        xhrMock.ontimeout?.({} as ProgressEvent);

        await expect(promise).rejects.toBeDefined();
    });

    it('should stringify query params correctly', () => {
        const data = { key1: 'value1', key2: 123, key3: true };
        const queryString = http.queryStringify(data);

        expect(queryString).toBe('?key1=value1&key2=123&key3=true');
    });
});
