import Block from '../../services/Block';

import { ButtonTemplate } from './index';
import './Button.style.pcss';

interface ButtonProps {
    text: string;
    className?: string;
	onClick?: (e: MouseEvent) => void;
}

interface ButtonBlockProps {
	text: string;
	className?: string;
	events?: {
		[key: string]: (e: MouseEvent) => void;
	};
}

export default class Button extends Block<ButtonBlockProps> {
    constructor({ text, className, onClick }: ButtonProps) {
        super({
            text,
            className,
			events: {
				click: (e: MouseEvent) => onClick && onClick(e),
			},
        });
    }

    render() {
        return ButtonTemplate as string ;
    }
}
