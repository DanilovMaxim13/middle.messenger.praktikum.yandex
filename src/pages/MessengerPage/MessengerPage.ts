import Block from '../../services/Block';
import chatController from '../../controllers/ChatController';
import router from '../../services/Router';
import store from '../../services/Store';

import ChatCard from '../../components/ChatCard';
import Link from '../../components/Link';

import { MessengerPageTemplate } from './index';
import './MessengerPage.style.pcss';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';
import { connect } from '../../services/HOC';
import authController from '../../controllers/AuthController';
import Messages from '../../components/Messages';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Tools from '../../components/Tools';

class MessengerPage extends Block {
    constructor() {
        if (!store.getState().user) {
            void authController.getUser().then(data => {
                const { status, responseText } = data as XMLHttpRequest;
                if (status === 200) {
                    const userData = JSON.parse(responseText);
                    store.set('user', userData);
                } else {
                    router.go('/');
                }
            });
        }
        super({
            ProfileLink: new Link({
                href: '#',
                linkLabel: 'Профиль',
                className: 'messenger__settings-link',
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    router.go('/settings');
                },
            }),
            CreateChatButton: new Button({
                text: 'Создать чат',
                onClick: () => {
                    this.children.CreateChatModal.setProps({
                        className: '',
                    });
                },
            }),
            ChatCards: [],
            Avatar: new Avatar({
                src: './AddAvatar.png',
                className: 'messenger__avatar',
            }),
            title: '',
            Input: new Input({
                id: 'message-input',
                className: 'messenger__message-input',
            }),
            IconSubmit: new Avatar({
                src: './icon-right-arrow.svg',
                className: 'messenger__icon-submit',
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    const message =
                        this.children.Input.getContent() as HTMLInputElement;
                    if (message.value !== '') {
                        void chatController
                            .sendMessage(
                                message.value.replace(/<\/[^>]+(>|$)/g, '')
                            )
                            .then(() => {
                                message.value = '';
                            });
                    }
                },
            }),
            Messages: new Messages({}),
            Tools: new Tools({ className: 'tools_hidden' }),
            ToolsIcon: new Avatar({
                src: './icon-vertical-dots.svg',
                className: 'messenger__icon-tools',
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    if (!!this.children.Tools.props.className) {
                        this.children.Tools.setProps({ className: '' });
                    } else {
                        this.children.Tools.setProps({
                            className: 'tools_hidden',
                        });
                    }
                },
            }),
            CreateChatModal: new Modal({
                title: 'Создание чата',
                buttonText: 'Создать чат',
                className: 'modal_hidden',
                buttonOnClick: (e: MouseEvent, value: string) => {
                    e.preventDefault();
                    if (value) {
                        void chatController.createChat(value).then(() => {
                            void this.getChats();
                        });
                    }
                },
            }),
        });

        void this.getChats();
    }

    async getChats() {
        await chatController.getUserChats().then(() => {
            const chats = store.getState().chats as any[];

            this.lists.ChatCards = chats.map((item, index) => {
                return new ChatCard({
                    avatar: item.avatar || './AddAvatar.png',
                    name: item.title,
                    lastMessage: item.last_message?.content,
                    onClick: async (e: MouseEvent) => {
                        e.preventDefault();
                        chatController.closeSocket();
                        await chatController.chatWebSocket(item.id as number);
                        this.lists.ChatCards.forEach(block =>
                            block.setProps({ className: '' })
                        );
                        this.lists.ChatCards[index].setProps({
                            className: 'active',
                        });
                        this.children.Tools = new Tools({
                            currentChatId: item.id,
                            className: 'tools_hidden',
                        });
                        this.setProps({ title: item.title });
                    },
                });
            });

            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        });

        this.lists.ChatCards[0]
            .getContent()
            .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }

    componentDidUpdate(
        oldProps: Record<string, any>,
        newProps: Record<string, any>
    ) {
        const messages = store.getState().messages as string;

        if (messages) {
            this.children.Messages = new Messages({
                messages: JSON.parse(messages),
            });
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return MessengerPageTemplate;
    }
}

export default connect(state => ({
    chats: state.chats,
    messages: state.messages,
    user: state.user,
}))(MessengerPage);
