import Block from '../../services/Block';

import Link from '../../components/Link';
import { default as NavBarComp } from '../../components/NavBar';

import { ErrorPageTemplate } from './index';
import './ErrorPage.style.pcss';

interface ErrorPageProps {
  errorCode: string;
  errorDescription: string;
  NavBar: NavBarComp;
}

export default class ErrorPage extends Block<ErrorPageProps & { Link: Link }> {
  constructor({ errorCode, errorDescription, NavBar }: ErrorPageProps) {
    super({
      Link: new Link({
        href: '#',
        linkLabel: 'Вернуться к чатам',
      }),
      NavBar,
      errorCode,
      errorDescription,
    });
  }

  render() {
    return ErrorPageTemplate;
  }
}
