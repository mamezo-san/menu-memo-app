import { createSelector } from 'reselect';

const menusSelector = (state) => state.menus;

export const getMenus = createSelector(
    [menusSelector],
    state => state.list
);