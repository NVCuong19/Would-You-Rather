import {GET_ALL_USER, SUBMIT_ANSWER, SUBMIT_NEW_QUESTION} from '../actions/login';


export function loginReducer(state = {}, action) {
    switch(action.type) {
        case GET_ALL_USER: 
            return {...state, allUsers: action.payload};
        case SUBMIT_ANSWER: 
            return {...state, allUsers: action.payload};
        case SUBMIT_NEW_QUESTION: 
            return {...state, allUsers: action.payload};
        default:
            return state;

    }
} 
