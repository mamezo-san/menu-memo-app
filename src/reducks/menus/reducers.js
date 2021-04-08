import * as Actions from './actions';
import initialState from '../store/initialState';

export const MenuReducers = (state=initialState.menus,action) => {
    switch(action.type){
        case Actions.FETCH_MENUS:
            return{
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
};