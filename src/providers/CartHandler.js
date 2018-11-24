
export const add = ({state, new_item}) => {
    for (var i in state.cart) {
        const item = state.cart[i]
        
        if ((new_item.item._id === item.item._id))
            return (false)
    }
    state.dispatch({type: "CART_ADD", payload: {...new_item, count: (state.cart.length + 1)}})
    return (true)
}

export const isInCart = ({cart, item}) => {
    for (var i in cart) {
        if ((item.item._id === cart[i].item._id))
            return (true)
    }
    return (false)
}

export const remove = ({state, item}) => {
    const {cart, dispatch} = state
    const new_cart = cart.filter(el => {
        return (item.item._id !== el.item._id)
    })

    dispatch({type: "CART", payload: new_cart})
    return (cart.length !== new_cart.length)
}