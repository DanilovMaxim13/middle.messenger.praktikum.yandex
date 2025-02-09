import Block from '../../services/Block';

import { AvatarTemplate } from './index';
import './Avatar.style.pcss';

interface AvatarProps {
    src: string;
    className?: string;
}

export default class Avatar extends Block<AvatarProps> {
    constructor({ src, className }: AvatarProps) {
        super({
            src,
            className,
        });
    }

    render() {
        return AvatarTemplate;
    }
}
