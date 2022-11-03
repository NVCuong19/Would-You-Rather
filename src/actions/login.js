export const GET_ALL_USER = 'GET_ALL_USER'
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const SUBMIT_NEW_QUESTION = "SUBMIT_NEW_QUESTION";


export function submitAnsAction(allUsers = {}) {
    return {
        type: SUBMIT_ANSWER,
        payload: allUsers
    };
}

export function submitNewQuesAction(ques = {}) {
    return {
        type: SUBMIT_NEW_QUESTION,
        payload: ques
    };
}

export function getAllUsersAction(allUsers = {}) {
    return {
        type: GET_ALL_USER,
        payload: allUsers
    };
}
