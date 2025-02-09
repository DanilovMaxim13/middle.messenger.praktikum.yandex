import EventBus from './EventBus';
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';

type Children = Record<string, Block<any>>;
type Lists = Record<string, Block<any>[]>;
type Attributes = Record<string, string>;

class Block<Props extends Record<string, any>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  readonly id: string = makeUUID();

  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  protected children: Children;

  private readonly lists: Lists;

  readonly props: Props;

  constructor(propsAndChildren: Props) {
    const { children, props, lists } = this.getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.children = children;
    this.props = this.makePropsProxy(props);
    this.lists = this.makePropsProxy(lists);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildren(propsAndChildren: Props & { children?: Children; lists?: Lists }): { children: Children, props: Props, lists: Lists } {
    const children: Children = {};
    const props: any = {};
    const lists: Lists = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as Props, lists };
  }

  private registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private addEvents(): void {
    const { events = {} } = this.props;

    (Object.keys(events)).forEach(eventName => {
      const eventHandler = events[eventName];

      if (this._element && eventHandler) {
        this._element.addEventListener(eventName, eventHandler);
      }
    });
  }

  private removeEvents(): void {
    const { events = {} } = this.props;

    (Object.keys(events) as Array<keyof HTMLElementEventMap>).forEach(eventName => {
      const eventHandler = events[eventName];

      if (this._element && eventHandler) {
        this._element.removeEventListener(eventName, eventHandler);
      }
    });
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any = {}, newProps: any = {}): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.debug(this, oldProps, newProps);
    return true;
  }

  addAttributes(): void {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value as string);
      }
    });
  }

  setAttributes(attr: Attributes): void {
    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  public setProps = (nextProps: Props): void => {
    console.log(1);
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public setLists = (nextList: Lists): void => {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const propsAndStubs: any = { ...this.props };
    const tmpId =  makeUUID();

    this.removeEvents();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this.createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this.createDocumentElement('template');

      child.forEach(item => {
		  listCont.content.append(item.getContent());
      });

      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);

      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this.addEvents();
    this.addAttributes();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Элемент отсутствует');
    }

    return this._element;
  }

  private makePropsProxy<T extends Props | Lists>(props: T): T {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  public show(): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }
}

export default Block;
