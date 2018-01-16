import {TEXT_MESSAGE, CHANGE_NICKNAME, DELETE_LAST_MESSAGE, FADE_LAST, USER_TYPING, COUNTDOWN} from './actionTypes';

export const textMessage = (text, styles) => {
    return {
        type: TEXT_MESSAGE,
        payload: {from: 'me', text, date: Date.now(), styles}
    };
};

export const changeNickname = (nickname) => {
    return {
        type: CHANGE_NICKNAME,
        payload: {
            from: 'me',
            nickname
        }
    };
};

export const deleteLast = () => {
    return {
        type: DELETE_LAST_MESSAGE,
        payload: {from: 'me'}
    };
};

export const fadeLast = () => {
    return {
        type: FADE_LAST,
        payload: {from: 'me'}
    };
};

export const userTyping = (isTyping) => {
    return {
        type: USER_TYPING,
        payload: {from: 'me', isTyping}
    };
};

export const countdown = (number, url) => {
    return {
        type: COUNTDOWN,
        payload: {from: 'me', number, redirectTo: url}
    };
};