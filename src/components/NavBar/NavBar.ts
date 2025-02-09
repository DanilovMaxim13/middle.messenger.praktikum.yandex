import Block from '../../services/Block';

import Link from '../../components/Link';

import { NavBarTemplate } from './index';
import './NavBar.style.pcss';

interface NavBarProps {
  onClick: (page: string) => void;
}

interface NavBarBlockProps {
  NavBarLinks?: Link[];
}

const NavBarLinks = [
  { href: '/404', linkLabel: 'Ошибка 404' },
  { href: '/500', linkLabel: 'Ошибка 500' },
  { href: '/ChatPage', linkLabel: 'Чаты' },
  { href: '/Profile', linkLabel: 'Профиль' },
  { href: '/EditProfile', linkLabel: 'Изменение данных' },
  { href: '/EditPassword', linkLabel: 'Изменение пароля' },
  { href: '/SignIn', linkLabel: 'Вход' },
  { href: '/SignUp', linkLabel: 'Регистрация' },
];

export default class NavBar extends Block<NavBarBlockProps> {
  constructor({ onClick }: NavBarProps) {
    super({
      NavBarLinks: NavBarLinks.map(linkProps =>
        new Link({
          ...linkProps,
          onClick: (e) => {
            e.preventDefault();
            onClick(linkProps.href);
          },
        }),
      ),
    });
  }

  render() {
    return NavBarTemplate;
  }
}
