import * as API from '../utils/api';
import {getAllUsersAction} from './login';

export function handleInitialData() {
    return (dispatch) => {
        return API.getAllUsers()
        .then((res) => {
            dispatch(getAllUsersAction(res))
        });
    }
}