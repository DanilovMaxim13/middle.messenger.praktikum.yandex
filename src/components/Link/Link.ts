import Block from '../../services/Block';

import { LinkTemplate } from './index';
import './Link.style.pcss';

export interface LinkProps {
    className?: string;
    href: string;
    linkLabel: string;
    onClick?: (e: MouseEvent) => void;
}

export default class Link extends Block {
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
