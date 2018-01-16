import {TEXT_MESSAGE, CHANGE_NICKNAME, DELETE_LAST_MESSAGE, FADE_LAST, USER_TYPING, COUNTDOWN} from '../actions/actionTypes';
import _ from 'lodash';
import {saveMessages, saveNicknames} from '../services/db';

const initialState = {
    messages: [],
    nicknames: {me: 'Anonymous', them: 'Anonymous'},
    isTyping: false
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case TEXT_MESSAGE: {
          let newState = {
            ...state,
            messages: [...state.messages, action.payload]
          };
          saveMessages(newState.messages);
          return newState;
        }
        case CHANGE_NICKNAME: {
            let newState = {
              ...state,
              nicknames: {
                ...state.nicknames,
                [action.payload.from]: action.payload.nickname
              }
            };
            saveNicknames(newState.nicknames);
            return newState;
        }
        case DELETE_LAST_MESSAGE: {
            let recipientMessages = state.messages.filter(message => message.from === action.payload.from);
            if (recipientMessages.length > 0) {
              let messageToRemove = _.orderBy(recipientMessages, ['date'], ['desc'])[0];
              let indexToRemove = state.messages.indexOf(messageToRemove);
              let newState = {
                ...state,
                messages: [...state.messages.slice(0, indexToRemove), ...state.messages.slice(indexToRemove + 1)]
              };
              saveMessages(newState.messages);
              return newState;
            }
            return state;
        }
        case FADE_LAST: {
            if (state.messages.length > 0 && action.payload.from === 'me') {
              let lastMessage = state.messages[state.messages.length - 1];
              return {...state, messages: [...state.messages.slice(0, state.messages.length - 1), {...lastMessage, styles: 'fade'}]};
            }
            return state;
        }
        case USER_TYPING: {
            if (action.payload.from === 'them') {
              return {...state, isTyping: action.payload.isTyping};
            }
            return state;
        }
        case COUNTDOWN: {
            if (action.payload.from === 'them') {
              return {
                ...state,
                countdown: {number: action.payload.number, redirectTo: action.payload.redirectTo}
              };
            }
            return state;
        }
        default:
          return state;
      }
};
