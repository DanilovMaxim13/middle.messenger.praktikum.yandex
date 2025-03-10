import Block from '../../services/Block';

import { AvatarModalTemplate } from './index';
import './AvatarModal.style.pcss';
import Button from '../Button';
import Label from '../Label';
import profileController from '../../controllers/ProfileController';
import store from '../../services/Store';
import { IUserData } from '../../api/AuthApi';

interface AvatarProps {
    title: string;
    className?: string;
    description?: string;
}

export default class AvatarModal extends Block {
    file: File | null = null;

    constructor({ title, className, description }: AvatarProps) {
        super({
            title,
            className,
            description,
            ButtonSubmit: new Button({
                text: 'Поменять',
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    if (this.file) {
                        const formData = new FormData();
                        formData.append('avatar', this.file);
                        void profileController
                            .changeAvatar(formData)
                            .then(data => {
                                if (data) {
                                    this.children.Avatar.setProps({
                                        src: `https://ya-praktikum.tech/api/v2/resources${data.avatar}`,
                                    });
                                    const userData = store.getState()
                                        .user as IUserData;
                                    store.set('user', {
                                        ...userData,
                                        avatar: data.avatar,
                                    });
                                }
                                this.children.ModalAvatar.setProps({
                                    isActive: false,
                                });
                                this.setProps({ description: '' });
                                this.file = null;
                            });
                    }
                },
            }),
            ButtonClose: new Button({
                text: 'Закрыть',
                className: 'grey',
                onClick: () => {
                    this.setProps({ className: 'avatar-modal_hidden' });
                },
            }),
            Input: new Label({
                id: 'avatar',
                className: 'avatar-modal__avatar-label',
                label: 'Выбрать файл на компьютере',
                type: 'file',
                name: 'avatar',
                onChange: (e: InputEvent) => {
                    const inputTarget = e.target as HTMLInputElement;

                    if (inputTarget && inputTarget.files) {
                        this.setProps({
                            description: inputTarget.files[0].name,
                        });
                        this.file = inputTarget.files[0];
                    }
                },
            }),
        });
    }

    render() {
        return AvatarModalTemplate;
    }
}
