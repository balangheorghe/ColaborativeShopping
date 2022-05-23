import {ADDITEM, EDITITEM, REMOVEITEM, TOGGLEITEM} from "../constants/shop";

export function addItem(name, count) {
    return {
        type: ADDITEM,
        payload: {name, count}
    }
}

export function editItem(name, count) {
    return {
        type: EDITITEM,
        payload: {name, count}
    }
}

export function removeItem(name) {
    return {
        type: REMOVEITEM,
        payload: {name}
    }
}

export function toggleItemSelect(name) {
    return {
        type: TOGGLEITEM,
        payload: {name}
    }
}
