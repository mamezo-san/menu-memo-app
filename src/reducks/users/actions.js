export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username,
            role: userState.role,
            // menus: userState.menus
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return{
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: "",
            role: "",
            // menus: []
        }
    }
};

export const FETCH_MENUS = "FETCH_MENUS";
export const fetchMenusAction = (menus) => {
    return{
        type: "FETCH_MENUS",
        payload: menus
    }
};

export const DELETE_MENU = "DELETE_MENU";
export const deleteMenuAction =(menus) => {
    return{
        type: "DELETE_MENU",
        payload: menus
    }
};