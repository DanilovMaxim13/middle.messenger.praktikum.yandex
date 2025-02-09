import Block from '../../services/Block';

import { default as NavBarComp } from '../../components/NavBar';
import ChatCard, { ChatCardProps } from '../../components/ChatCard';

import { ChatPageTemplate } from './index';
import './ChatPage.style.pcss';

interface ChatPageProps {
    NavBar: NavBarComp;
    ChatCards: ChatCardProps[];
}

interface ChatPageBlockProps {
    NavBar: NavBarComp;
    ChatCards: ChatCard[];
}

export default class ChatPage extends Block<ChatPageBlockProps> {
    constructor({ NavBar, ChatCards }: ChatPageProps) {
        super({
            NavBar,
            ChatCards: ChatCards.map(
                chatCardsProps => new ChatCard(chatCardsProps)
            ),
        });
    }

    render() {
        return ChatPageTemplate;
    }
}
