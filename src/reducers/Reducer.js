import { details } from "../providers/CartHandler";

export const reducer = (state, action) => {
    switch (action.type){
        case "NEW_OBJ": return ({
            ...state,
            [action.payload.key]: action.payload.value
        })
        case "LOGIN": return ({
            ...state,
            login: action.payload
        })
        case "ALERT_PORTAL": return ({
            ...state,
            alertPortal: action.payload
        })
        case "ABOUT": return ({
            ...state,
            about: action.payload
        })
        case "SIDEBAR": return ({
            ...state,
            isSidebarOpen: (Object.keys(action).length === 2) ? action.payload : (state.isSidebarOpen) ? false : true
        })
        case "MAIN_LAYOUT": return ({
            ...state,
            main_layout_calculations: action.payload
        })
        case "MENU": return ({
            ...state,
            menu: action.payload
        })
        case "ACCOUNT": return({
            ...state,
            account: action.payload
        })
        case "CART_ADD": return ({
            ...state,
            cart: {
                details: details({cart: state.cart.items.concat([action.payload])}),
                items: state.cart.items.concat([action.payload])
            }
        })
        case "CART": return ({
            ...state,
            cart: {
                details: details({cart: action.payload}),
                items: action.payload
            }
        })
        case "TEST": return ({
            ...state,
            test: action.payload
        })
        case "PAGE": return ({
            ...state,
            active_page: action.payload
        })
        default:
            return (state)
    }
}