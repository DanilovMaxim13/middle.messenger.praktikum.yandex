import { Router, Route } from './Router';
import Block from '../Block';

jest.mock('../Block', () => {
	return jest.fn().mockImplementation(() => {
		return {
			getContent: jest.fn().mockReturnValue(document.createElement('div')),
			dispatchComponentDidMount: jest.fn(),
			element: {
				remove: jest.fn(),
			},
		};
	});
});

describe('Router', () => {
	let router: Router;
	let mockBlock: jest.Mocked<typeof Block>;

	beforeEach(() => {
		router = new Router('#app');
		mockBlock = Block as jest.Mocked<typeof Block>;
		document.body.innerHTML = '<div id="app"></div>';
	});

	test('should add route with use method', () => {
		router.use('/test', mockBlock, {});
		expect(router.routes.length).toBe(1);
		expect(router.routes[0]).toBeInstanceOf(Route);
	});

	test('should navigate to the correct route', () => {
		router.use('/test', mockBlock, {}).start();
		router.go('/test');
		expect(router.getRoute('/test')).toBeDefined();
	});

	test('should call render on route when navigated to', () => {
		const route = new Route('/test', mockBlock, { rootQuery: '#app', props: {} });
		const renderSpy = jest.spyOn(route, 'render');
		router.routes.push(route);
		router.go('/test');
		expect(renderSpy).toHaveBeenCalled();
	});

	test('should call leave on current route when navigating to a new route', () => {
		const oldRoute = new Route('/old', mockBlock, { rootQuery: '#app', props: {} });
		const newRoute = new Route('/new', mockBlock, { rootQuery: '#app', props: {} });
		const leaveSpy = jest.spyOn(oldRoute, 'leave');
		router.routes.push(oldRoute, newRoute);
		router.go('/old');
		router.go('/new');
		expect(leaveSpy).toHaveBeenCalled();
	});

	test('should handle back navigation', () => {
		const backSpy = jest.spyOn(window.history, 'back');
		router.back();
		expect(backSpy).toHaveBeenCalled();
	});

	test('should handle forward navigation', () => {
		const forwardSpy = jest.spyOn(window.history, 'forward');
		router.forward();
		expect(forwardSpy).toHaveBeenCalled();
	});
});
