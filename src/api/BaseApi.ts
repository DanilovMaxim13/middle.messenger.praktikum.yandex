export class BaseAPI {
    create(data: unknown): unknown {
        console.debug(data);
        throw new Error('Не реализовано');
    }

    request() {
        throw new Error('Не реализовано');
    }

    update(data: unknown): unknown {
        console.debug(data);
        throw new Error('Не реализовано');
    }

    delete(data: unknown): unknown {
        console.debug(data);
        throw new Error('Не реализовано');
    }
}
