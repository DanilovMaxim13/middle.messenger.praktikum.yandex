import Block from '../../services/Block';

import { LinkTemplate } from './index';
import './Link.style.pcss';

export interface LinkProps {
  className?: string;
  href: string;
  linkLabel: string;
  onClick?: (e: MouseEvent) => void;
}

interface LinkBlockProps {
  className?: string;
  events: {
    [key: string]: (e: MouseEvent) => void
  };
  href: string;
  linkLabel: string;
}

export default class Link extends Block<LinkBlockProps> {
  constructor({ href, className, linkLabel, onClick }: LinkProps) {
    super({
      href,
      className,
      linkLabel,
      events: {
        click: (e: MouseEvent) => onClick && onClick(e),
      },
    });
  }

  render() {
    return LinkTemplate;
  }
}
