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
}

export default class Label extends Block<LabelProps> {
    constructor(props: LabelProps) {
        const { type, className, name, value, id, disabled, label } = props;
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
            }),
            label,
            className,
            id,
            errorMessage: '',
        });
    }

    isValid(): boolean {
		const validationResult = Validator.isValid(this.children.Input.element);
        if (!validationResult.isValid) {
            this.setProps({
                ...this.props,
                className: 'validate-error',
                errorMessage: validationResult.errorMessage,
            })

			return false;
        }

		this.setProps({
			...this.props,
			className: '',
			errorMessage: '',
		});

		return true;
    }

    render() {
        return LabelTemplate as string;
    }
}
