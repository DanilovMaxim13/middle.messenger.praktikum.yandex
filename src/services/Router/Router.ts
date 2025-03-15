import Block from '../Block';

interface RouteProps {
    rootQuery: string;
    props: any;
}

class Route {
    private _pathname: string;

    private readonly _blockClass: typeof Block;

    private _block: Block | null;

    private _props: RouteProps;

    constructor(pathname: string, view: typeof Block, props: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.element?.remove();
        }
    }

    match(pathname: string) {
        return this._pathname === pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props.props);
        }

        const root = document.querySelector(this._props.rootQuery);

        if (root) {
            root.appendChild(this._block.getContent());
            this._block.dispatchComponentDidMount();
        }
    }
}

export class Router {
    private routes: Route[] = [];

    private history: History = window.history;

    private _currentRoute: Route | null = null;

    private readonly _rootQuery: string;

    constructor(rootQuery: string) {
        this._rootQuery = rootQuery;
    }

    use(pathname: string, block: typeof Block, props?: any) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
            props,
        });

        this.routes.push(route);
        return this;
    }

    start(): void {
        window.onpopstate = () => {
            console.log(`onpopstate: ${window.location.pathname}`);
            this._onRoute(window.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find((route: any) => route.match(pathname));
    }
}

const router = new Router('#app');

export default router;
