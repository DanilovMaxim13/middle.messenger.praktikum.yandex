import Block from '../../services/Block';

import { ModalTemplate } from './index';
import './Modal.style.pcss';
import Button from '../Button';
import Label from '../Label';

interface ModalProps {
    title: string;
    buttonText: string;
    buttonOnClick?: (e: MouseEvent, value: string) => void;
    className?: string;
}

export default class Modal extends Block {
    private inputValue: string = '';

    constructor({ title, className, buttonText, buttonOnClick }: ModalProps) {
        super({
            title,
            className,
            ButtonSubmit: new Button({
                text: buttonText,
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    if (buttonOnClick) {
                        buttonOnClick(e, this.inputValue);
                    }
                    this.setProps({ className: 'modal_hidden' });
                },
            }),
            ButtonClose: new Button({
                text: 'Закрыть',
                className: 'grey',
                onClick: () => {
                    this.setProps({ className: 'modal_hidden' });
                },
            }),
            Input: new Label({
                id: 'avatar',
                className: 'modal__',
                onChange: (e: any) => {
                    this.inputValue = e.target?.value;
                },
            }),
        });
    }

    render() {
        return ModalTemplate;
    }
}
