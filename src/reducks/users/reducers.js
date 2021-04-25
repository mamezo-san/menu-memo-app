import * as Actions from './actions';
import initialState from '../store/initialState';

export const UserReducers = (state=initialState.users, action) => {
    switch(action.type){
        case Actions.SIGN_IN: 
            return{
                ...state,
                ...action.payload
            };
        case Actions.SIGN_OUT:
            return{
                ...action.payload
            };
        case Actions.FETCH_MENUS:
            return{
                ...state,
                menus: [...action.payload]
            };
        case Actions.DELETE_MENU:
            return{
                ...state,
                menus: [...action.payload]
            };
        default: 
            return state
    }
};