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
        case "TEST": return ({
            ...state,
            test: action.payload
        })
        default:
            return (state)
    }
}