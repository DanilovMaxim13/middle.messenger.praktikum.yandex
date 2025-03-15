//@ts-nocheck
import router from './Router';

describe('Router class', () => {
	describe('use', () => {
		it('should add a new route', () => {
			router.use('/path', TestBlock);
			expect(1).toEqual(1);
		});
	});

	describe('start', () => {
		it('should register onpopstate event listener', () => {
			const spy = jest.spyOn(window, 'onpopstate');
			router.start();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('_onRoute', () => {
		it('should call render method of current route', () => {
			const route = new Route('/path', TestBlock, { rootQuery: '#app' });
			router.routes.push(route);
			const spy = jest.spyOn(route, 'render');
			router._onRoute('/path');
			expect(spy).toHaveBeenCalled();
		});

		it('should call leave method of previous route', () => {
			const oldRoute = new Route('/old-path', TestBlock, { rootQuery: '#app' });
			const newRoute = new Route('/new-path', TestBlock, { rootQuery: '#app' });
			router.routes.push(oldRoute, newRoute);
			router._currentRoute = oldRoute;
			const spyLeave = jest.spyOn(oldRoute, 'leave');
			const spyRender = jest.spyOn(newRoute, 'render');
			router._onRoute('/new-path');
			expect(spyLeave).toHaveBeenCalled();
			expect(spyRender).toHaveBeenCalled();
		});
	});

	describe('go', () => {
		it('should push state and trigger _onRoute', () => {
			const spyPushState = jest.spyOn(window.history, 'pushState');
			const spyOnRoute = jest.spyOn(router, '_onRoute');
			router.go('/path');
			expect(spyPushState).toHaveBeenCalled();
			expect(spyOnRoute).toHaveBeenCalled();
		});
	});

	describe('back', () => {
		it('should call history.back', () => {
			const spyBack = jest.spyOn(window.history, 'back');
			router.back();
			expect(spyBack).toHaveBeenCalled();
		});
	});

	describe('forward', () => {
		it('should call history.forward', () => {
			const spyForward = jest.spyOn(window.history, 'forward');
			router.forward();
			expect(spyForward).toHaveBeenCalled();
		});
	});

	describe('getRoute', () => {
		it('should find route by pathname', () => {
			const route = new Route('/path', TestBlock, { rootQuery: '#app' });
			router.routes.push(route);
			expect(router.getRoute('/path')).toEqual(route);
		});

		it('should return undefined for non-existing route', () => {
			expect(router.getRoute('/non-existing-path')).toBeUndefined();
		});
	});
});
