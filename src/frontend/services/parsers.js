import {textMessage, changeNickname, deleteLast, fadeLast} from '../actions';

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

export const think = parser((text) => text.startsWith('/think'), (text) => {
    if (text.substring(7) !== '') {
        return textMessage(text.substring(7), 'think');
    }
    return undefined;
});

export const oops = parser((text) => text.startsWith('/oops'), () => deleteLast());

export const fdl = parser((text) => text.startsWith('/fadelast'), () => fadeLast());

export const highlight = parser((text) => text.startsWith('/highlight'), (text) => {
    if (text.substring(11) !== '') {
        return textMessage(text.substring(11), 'highlight');
    }
    return undefined;
});

export default (text) => (textMessage(text));