import Block from '../../services/Block';

import Button from '../../components/Button';
import Link from '../../components/Link';
import { default as NavBarComp } from '../../components/NavBar';
import Label from '../../components/Label';

import { InputProps } from '../../components/Input';

import { AuthorizationTemplate } from './index';
import './Authorization.style.pcss';

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
  constructor({ title, buttonText, linkText, Inputs, NavBar }: AuthorizationProps) {
    super({
      Button: new Button({
        text: buttonText,
        className: 'auth-section__submit-button',
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

  render() {
    return AuthorizationTemplate;
  }
}
