import {ADDITEM, EDITITEM, REMOVEITEM, TOGGLEITEM, VIEWLIST} from "../constants/shop";

const initialState = {
    shoppingList: [
        {name: "Lapte", quantity: {value: 350, type: "ml"}, category: "lactate", count: 999, itemPic: null, s: false},  // s=selected
        {name: "Oua", quantity: null, category: "bacanie", count: 3, s: false},
        {name: "Cereale", quantity: null, category: "cereale", count: 1, photoUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/01/29/14/kellogs.jpg', s: false},
        {name: "Lapte Brasov 3.5% grasime", quantity: {value: 500, type: "ml"}, category: "lactate", count: 2, photoUrl: 'https://prodlacta.ro/wp-content/uploads/2018/04/lapte_delamunte_3_5.jpg', s: false},
        {name: "Some long product name 2123.4324.% with may options and stuff", quantity: {value: 100000, type: "nano"}, category: "others", photoUrl: "https://i.pinimg.com/originals/89/5c/cc/895cccce862751373e5b14dc11e3bbd7.jpg", count: 1000000}
    ]
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDITEM:
            return {
                ...state, shoppingList: state.shoppingList.concat({...action.payload})
            };
        case EDITITEM:
            return {
                ...state, shoppingList: state.shoppingList.map((item) => {
                    if (item.name === action.payload.name) {
                        return {...item, ...action.payload}
                    }
                    return item;
                })
            };
        case REMOVEITEM:
            return {
                ...state, shoppingList: state.shoppingList.filter(item => item.name !== action.payload.name)
            };
        case TOGGLEITEM:
            return {
                ...state, shoppingList: state.shoppingList.map((item) => {
                    if (item.name === action.payload.name) {
                        return {...item, s: !item.s}
                    }
                    if (item.s) item.s = false;
                    return item;
                })
            };
        default:
            return state;
    }
};

export default shopReducer;
