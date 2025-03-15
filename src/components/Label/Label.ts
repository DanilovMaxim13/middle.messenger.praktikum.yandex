import Block from '../../services/Block';

import Input from '../Input';

import { LabelTemplate } from './index';
import './Label.style.pcss';
import Validator from '../../services/Validator';

export interface LabelProps {
    className?: string;
    disabled?: boolean;
    id: string;
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    errorMessage?: string;
    Input?: Input;
    validate?: boolean;
    onChange?: (e: InputEvent) => void;
}

export default class Label extends Block {
    constructor(props: LabelProps) {
        const {
            type,
            className,
            name,
            value,
            id,
            disabled,
            label,
            validate,
            onChange,
        } = props;
        super({
            Input: new Input({
                className,
                disabled,
                id,
                name,
                type,
                value,
                onBlur: () => {
                    this.isValid();
                },
                onChange,
            }),
            label,
            className,
            id,
            errorMessage: '',
            validate,
        });
    }

    isValid(): boolean {
        if (!this.props.validate) return true;

        const validationResult = Validator.isValid(this.children.Input.element);
        if (!validationResult.isValid) {
            this.setProps({
                ...this.props,
                className: `${this.props.className} validate-error`,
                errorMessage: validationResult.errorMessage,
            });

            return false;
        }

        this.setProps({
            ...this.props,
            className: this.props.className?.replaceAll(' validate-error', ''),
            errorMessage: '',
        });

        return true;
    }

    render() {
        return LabelTemplate as string;
    }
}
