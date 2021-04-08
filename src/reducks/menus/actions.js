export const FETCH_MENUS = "FETCH_MENUS";
export const fetchMenusActions = (menuState) => {
    return{
        type: "FETCH_MENUS",
        payload: {
            mid: menuState.mid,
            menuname: menuState.menuname
        }
    }
};

