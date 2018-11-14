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
        case "SIDEBAR": return ({
            ...state,
            isSidebarOpen: (state.isSidebarOpen) ? false : true
        })
        case "TEST": return ({
            ...state,
            test: action.payload
        })
        default:
            return (state)
    }
}