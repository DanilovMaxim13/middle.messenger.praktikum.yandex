import Block from './Block';

jest.mock('../EventBus');

describe('Block', () => {
	let block: Block;

	beforeEach(() => {
		block = new Block({});
	});

	test('should initialize with default values', () => {
		expect(block.id).toBeDefined();
		expect(block.element).toBeNull();
		expect(block.children).toEqual({});
		expect(block.lists).toEqual({});
		expect(block.props).toEqual({});
	});

	test('should add attributes to element', () => {
		const mockElement = document.createElement('div');
		block._element = mockElement;
		block.props.attr = { id: 'test-id' };
		block.addAttributes();
		expect(mockElement.getAttribute('id')).toBe('test-id');
	});

	test('should set attributes to element', () => {
		const mockElement = document.createElement('div');
		block._element = mockElement;
		block.setAttributes({ id: 'test-id' });
		expect(mockElement.getAttribute('id')).toBe('test-id');
	});

	test('should show element', () => {
		const mockElement = document.createElement('div');
		block._element = mockElement;
		block.show();
		expect(mockElement.style.display).toBe('block');
	});

	test('should hide element', () => {
		const mockElement = document.createElement('div');
		block._element = mockElement;
		block.hide();
		expect(mockElement.style.display).toBe('none');
	});

	test('should get content', () => {
		const mockElement = document.createElement('div');
		block._element = mockElement;
		const content = block.getContent();
		expect(content).toBe(mockElement);
	});

	test('should throw error if element is null when getting content', () => {
		block._element = null;
		expect(() => block.getContent()).toThrow('Элемент отсутствует');
	});
});
