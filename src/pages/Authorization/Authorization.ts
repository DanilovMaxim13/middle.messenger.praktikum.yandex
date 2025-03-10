import Block from '../../services/Block';

import Button from '../../components/Button';
import Link from '../../components/Link';
import Label from '../../components/Label';

import { InputProps } from '../../components/Input';

import { AuthorizationTemplate } from './index';
import './Authorization.style.pcss';

import Validator from '../../services/Validator';
import router from '../../services/Router';
import store from '../../services/Store';
import { connect } from '../../services/HOC';

import authController from '../../controllers/AuthController';
// import { ISignUpData } from '../../api/AuthApi';

interface AuthorizationProps {
    buttonOnClick: (data: Record<string, string>) => void;
    Inputs: InputProps[];
    buttonText: string;
    linkText: string;
    title: string;
    linkOnClick: () => void;
}

class Authorization extends Block {
    constructor({
        linkOnClick,
        Inputs,
        buttonOnClick,
        buttonText,
        linkText,
        title,
    }: AuthorizationProps) {
        super({
            Button: new Button({
                text: buttonText,
                className: 'auth-section__submit-button',
                onClick: (e: MouseEvent) => {
                    e.preventDefault();
                    const data: Record<string, string> = {};

                    this.lists.Inputs.forEach(children => {
                        const inputData = Validator.getFormData(children);
                        if (inputData) {
                            data[inputData.name] = inputData.value;
                        }
                    });

                    const isFormValid = this.checkFormValidity();

                    if (isFormValid) {
                        buttonOnClick(data);
                    }
                },
            }),
            Inputs: Inputs.map(inputsProps => new Label(inputsProps)),
            Link: new Link({
                href: '#',
                onClick: linkOnClick,
                linkLabel: linkText,
            }),
            title,
        });

        void this.checkUserIsAuthenticated();
    }

    checkFormValidity() {
        const Inputs = this.lists.Inputs;
        let isFormValid = true;

        Inputs.forEach(input => {
            if (input instanceof Label) {
                if (!input.isValid()) {
                    isFormValid = false;
                }
            }
        });

        return isFormValid;
    }

    async checkUserIsAuthenticated(): Promise<void> {
        const res = await authController.getUser();

        if (res?.status === 200) {
            const userData = JSON.parse(res.responseText);
            store.set('user', userData);
            router.go('/messenger');
        }
    }

    render() {
        return AuthorizationTemplate as string;
    }
}

export default connect(() => ({}))(Authorization);
