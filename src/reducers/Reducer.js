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
        case "TEST": return ({
            ...state,
            test: action.payload
        })
        default:
            return (state)
    }
}