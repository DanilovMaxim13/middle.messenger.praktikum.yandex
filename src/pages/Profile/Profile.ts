import Block from '../../services/Block';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import { InputProps } from '../../components/Input';
import Label from '../../components/Label';
import Link, { LinkProps } from '../../components/Link';
import { default as NavBarComp } from '../../components/NavBar';

import { ProfileTemplate } from './index';
import './Profile.style.pcss';

interface ProfileProps {
  Inputs: InputProps[];
  Links?: LinkProps[];
  NavBar: NavBarComp;
  buttonText?: string;
}

interface ProfileBlockProps {
  Avatar: Avatar;
  Button: Button | null;
  Inputs: Label[];
  Links: Link[] | null;
  NavBar: NavBarComp;
}

export default class Profile extends Block<ProfileBlockProps> {
  constructor({ Inputs, buttonText, Links, NavBar }: ProfileProps) {
    super({
      Avatar: new Avatar({
        src: './AddAvatar.png',
        className: 'profile-section__avatar',
      }),
      Button: buttonText
        ? new Button({ text: buttonText })
        : null,
      Inputs: Inputs.map(inputsProps => new Label({
        ...inputsProps,
        className: 'profile-section__input',
      })),
      Links: Links
        ? Links.map(linkProps => new Link(linkProps))
        : null,
      NavBar,
    });
  }

  render() {
    return ProfileTemplate;
  }
}
