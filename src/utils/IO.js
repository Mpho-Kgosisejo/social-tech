export const onChangeInput = ({state, e}) => {
    return {
        ...state,
        [e.target.name]: e.target.value
    }
}