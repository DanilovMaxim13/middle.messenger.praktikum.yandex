import Input from '../components/Input';
import Label from '../components/Label';

type ValidationRules = Record<string, { regex: RegExp; errorMessage: string }>;

class Validator {
    static rulesRegex: ValidationRules = {
        email: {
            regex: /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            errorMessage:
                'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
        },
        password: {
            regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
            errorMessage:
                'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        },
        phone: {
            regex: /^\+?\d{10,15}$/,
            errorMessage:
                'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
        },
        name: {
            regex: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
            errorMessage:
                'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
        },
        login: {
            regex: /^[A-Za-z][A-Za-z0-9_-]{2,19}$/,
            errorMessage:
                'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
        },
        message: {
            regex: /^.+$/,
            errorMessage: 'Не должно быть пустым',
        },
    };

    isValid(input: HTMLElement | null) {
        if (input instanceof HTMLInputElement) {
            let isValid;

			if (input?.id && Validator.rulesRegex[input.id]) {
                isValid = Validator.rulesRegex[input.id].regex.test(input.value);
                return {
                    isValid,
                    errorMessage: isValid
                        ? ''
                        : Validator.rulesRegex[input.id].errorMessage,
                };
			}

            return { isValid: true, errorMessage: '' };
        }

        throw new Error('Произошла ошибка!');
    }

	getFormData (component: any): any {
		if (component instanceof Input && component.element && component.element instanceof HTMLInputElement) {
			return {name: component.element.name, value: component.element.value};
		}

		if (component instanceof Label) {
			return this.getFormData(component.children[Object.keys(component.children)[0]])
		}
		return null;
	}
}

export default new Validator();
