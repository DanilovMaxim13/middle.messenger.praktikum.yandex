import Block from '../../services/Block';

import Link from '../../components/Link';

import { ErrorPageTemplate } from './index';
import './ErrorPage.style.pcss';
import router from '../../services/Router';
import store from '../../services/Store';

interface ErrorPageProps {
    errorCode: string;
    errorDescription: string;
}

export default class ErrorPage extends Block {
    constructor({ errorCode, errorDescription }: ErrorPageProps) {
        super({
            Link: new Link({
                href: '#',
                onClick: e => {
                    e.preventDefault();
                    router.go('/register');
                },
                linkLabel: 'Вернуться к чатам',
            }),
            errorCode,
            errorDescription,
        });
    }

    componentDidMount() {
        console.log(store.getState().user);
    }

    render() {
        return ErrorPageTemplate;
    }
}
