import Block from '../../services/Block';

import Button from '../../components/Button';
import Link from '../../components/Link';
import { default as NavBarComp } from '../../components/NavBar';
import Label from '../../components/Label';

import { InputProps } from '../../components/Input';

import { AuthorizationTemplate } from './index';
import './Authorization.style.pcss';
import Validator from '../../services/Validator';

interface AuthorizationProps {
    Inputs: InputProps[];
    buttonText: string;
    linkText: string;
    title: string;
    NavBar: NavBarComp;
}

interface AuthorizationBlockProps {
    Inputs: InputProps[];
    Button: Button;
    Link: Link;
    NavBar: NavBarComp;
    title: string;
}

export default class Authorization extends Block<AuthorizationBlockProps> {
    constructor({
        title,
        buttonText,
        linkText,
        Inputs,
        NavBar,
    }: AuthorizationProps) {
        super({
            Button: new Button({
                text: buttonText,
                className: 'auth-section__submit-button',
				onClick: (e: MouseEvent) => {
					e.preventDefault();
					const data: Record<string, string> = {}

					this.lists.Inputs.forEach(children => {
						const inputData = Validator.getFormData(children);
						if (inputData) {
							data[inputData.name] = inputData.value;
						}
					})

					const isFormValid = this.checkFormValidity();

					if (isFormValid) {
						console.log(data)
					}
				}
            }),
            Inputs: Inputs.map(inputsProps => new Label(inputsProps)),
            Link: new Link({
                href: '#',
                linkLabel: linkText,
            }),
            NavBar,
            title,
        });
    }

	checkFormValidity() {
		const Inputs = this.lists.Inputs;
		let isFormValid = true;

		Inputs.forEach(input => {
			if (input  instanceof Label) {
				if (!input.isValid()) {
					isFormValid = false;
				}
			}
		})

		return isFormValid
	}

    render() {
        return AuthorizationTemplate as string;
    }
}
