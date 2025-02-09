import Block from '../../services/Block';

import { ButtonTemplate } from './index';
import './Button.style.pcss';

interface ButtonProps {
  text: string;
  className?: string;
}

export default class Button extends Block<ButtonProps> {
  constructor({ text, className }: ButtonProps) {
    super({
      text,
      className,
    });
  }

  render() {
    return ButtonTemplate;
  }
}
