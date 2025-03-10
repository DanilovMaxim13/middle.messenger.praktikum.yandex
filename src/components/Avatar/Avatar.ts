import Block from '../../services/Block';

import { AvatarTemplate } from './index';
import './Avatar.style.pcss';

interface AvatarProps {
    src: string;
    className?: string;
    onClick?: (e: MouseEvent) => void;
}

export default class Avatar extends Block {
    constructor({ src, className, onClick }: AvatarProps) {
        super({
            src,
            className,
            events: {
                click: (e: MouseEvent) => onClick && onClick(e),
            },
        });
    }

    render() {
        return AvatarTemplate;
    }
}
