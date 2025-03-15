import Block from '../../services/Block';

import { ButtonTemplate } from './index';
import './Button.style.pcss';

interface ButtonProps {
    className?: string;
    onClick?: (e: MouseEvent) => void;
    text: string;
}

export default class Button extends Block {
    constructor({ onClick, className, text }: ButtonProps) {
        super({
            text,
            className,
            events: {
                click: (e: MouseEvent) => onClick && onClick(e),
            },
        });
    }

    render() {
        return ButtonTemplate as string;
    }
}
