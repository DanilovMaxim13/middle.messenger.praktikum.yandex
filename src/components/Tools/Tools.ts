import Block from '../../services/Block';

import { ToolsTemplate } from './index';
import './Tools.style.pcss';
import Button from '../Button';
import Modal from '../Modal';
import chatController from '../../controllers/ChatController';
import { IUserData } from '../../api/AuthApi';

interface ToolsProps {
    className?: string;
    currentChatId?: number;
}

export default class Tools extends Block {
    constructor({ className, currentChatId }: ToolsProps) {
        super({
            className,
            AddUserBtn: new Button({
                text: 'Добавить пользователя',
                className: 'grey',
                onClick: () => {
                    this.children.AddUserModal.setProps({ className: '' });
                },
            }),
            AddUserModal: new Modal({
                title: 'Добавление пользователя',
                buttonText: 'Добавить',
                className: 'modal_hidden',
                buttonOnClick: (e: MouseEvent, value: string) => {
                    e.preventDefault();
                    void chatController
                        .searchUser(value)
                        .then((users: IUserData[]) => {
                            if (!users.length) {
                                throw new Error('Пользователь не найден');
                            }
                            return users.map(user => user.id);
                        })
                        .then(usersId => {
                            void chatController
                                .addRemoveUsers(
                                    currentChatId as number,
                                    usersId,
                                    true
                                )
                                .then(status => {
                                    if (!status || status !== 'OK') {
                                        throw new Error();
                                    }
                                    this.setProps({
                                        className: 'tools_hidden',
                                    });
                                });
                        });
                },
            }),
            DeleteUserBtn: new Button({
                text: 'Удалить пользователя',
                className: 'grey',
                onClick: () => {
                    this.children.DeleteUserModal.setProps({ className: '' });
                },
            }),
            DeleteUserModal: new Modal({
                title: 'Удаление пользователя',
                buttonText: 'Удалить',
                className: 'modal_hidden',
                buttonOnClick: (e: MouseEvent, value: string) => {
                    e.preventDefault();
                    void chatController
                        .searchUser(value)
                        .then((users: IUserData[]) => {
                            if (!users.length) {
                                throw new Error('Пользователь не найден');
                            }
                            return users.map(user => user.id);
                        })
                        .then(usersId => {
                            void chatController
                                .addRemoveUsers(
                                    currentChatId as number,
                                    usersId,
                                    false
                                )
                                .then(status => {
                                    if (!status || status !== 'OK') {
                                        throw new Error();
                                    }
                                    this.setProps({
                                        className: 'tools_hidden',
                                    });
                                });
                        });
                },
            }),
        });
    }

    render() {
        return ToolsTemplate;
    }
}
