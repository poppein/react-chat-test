import {TEXT_MESSAGE} from './actionTypes';

export const textMessage = (text) => {
    return {
        type: TEXT_MESSAGE,
        payload: {text, date: Date.now()}
    };
};