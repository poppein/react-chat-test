import {TEXT_MESSAGE} from '../actions/actionTypes';

const initialState = {
    messages: [],
    nickname: 'Anonymous'
  };

export default (state = initialState, action) => {
    switch (action.type) {
        case TEXT_MESSAGE: {
          let newState = {
            ...state,
            messages: [...state.messages, action.payload]
          };
          return newState;
        }
        default:
          return state;
      }
};
