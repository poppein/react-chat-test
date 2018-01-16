import {textMessage, changeNickname} from '../actions';

const parser = (condition, parsingFunc) => {
    return (text) => {
        if (condition(text)) {
            return parsingFunc(text);
        }
        return undefined;
    };
};

export const nick = parser((text) => text.startsWith('/nick'), (text) => {
    let textSplit = text.split(' ');
    if (textSplit.length > 1) {
        return changeNickname(textSplit[1]);
    }
    return undefined;
});

export default (text) => (textMessage(text));