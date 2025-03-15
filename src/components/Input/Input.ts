import Block from '../../services/Block';

import { InputTemplate } from './index';
import './Input.style.pcss';

export interface InputProps {
    className?: string;
    disabled?: boolean;
    id: string;
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    onFocus?: (e: any) => void;
    onBlur?: (e: any) => void;
    onChange?: (e: any) => void;
    events?: {
        [key: string]: (e: MouseEvent) => void;
    };
}

export default class Input extends Block {
    constructor({
        type,
        className,
        name,
        value,
        id,
        disabled,
        label,
        onBlur,
        onFocus,
        onChange,
    }: InputProps) {
        super({
            className,
            disabled,
            id,
            label,
            name,
            type,
            value,
            events: {
                blur: (e: Event) => onBlur && onBlur(e),
                focus: (e: FocusEvent) => onFocus && onFocus(e),
                change: (e: InputEvent) => onChange && onChange(e),
            },
        });
    }

    render() {
        return InputTemplate as string;
    }
}
