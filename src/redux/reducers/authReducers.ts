import { CONNECTED, LOGOUT } from "../actions/actionTypes";
import { AuthAction } from "../actions/types"
import { getInitStore } from "../lib/initLib";



const initStore = getInitStore()

const initAction: AuthAction = {
    type: LOGOUT,
    payload: initStore
}

export const authReducers = (state = initStore, action: AuthAction = initAction) =>{
    switch (action.type) {
        case CONNECTED:
            return {
                isAuth: true,
                token: action.payload?.token,
                userId: action.payload?.userId
            }
            break;
        case LOGOUT:
            localStorage.removeItem("auth")
            return {
                isAuth: false,
                token: "",
                userId: ""
            }
            break;
    
        default:
            return state
            break;
    }
}