
export const add = ({state, new_item}) => {
    for (var i in state.cart.items) {
        const item = state.cart.items[i]
        
        if ((new_item._id === item._id))
            return (false)
    }
    state.dispatch({type: "CART_ADD", payload: {...new_item, count: (state.cart.items.length + 1)}})
    return (true)
}

export const isInCart = ({cart, item}) => {
    for (var i in cart) {
        if ((item._id === cart[i]._id))
            return (true)
    }
    return (false)
}

export const remove = ({state, item}) => {
    const {cart, dispatch} = state
    const new_cart = cart.items.filter(el => {
        return (item._id !== el._id)
    })

    dispatch({type: "CART", payload: new_cart})
    return (cart.items.length !== new_cart.length)
}

export const update = ({state, item}) => {
    const {cart, dispatch} = state
    let new_items = []

    for (var i in cart.items){
        const original_item = cart.items[i]

        if (original_item._id === item._id)
            new_items.push({...original_item, ...item})
        else
            new_items.push(original_item)
    }
    
    dispatch({type: "CART", payload: new_items})
    return (new_items)
}

export const details = ({cart}) => {
    let data = {
        itemsCount: cart.length,
        totalItemsCount: 0,
        subTotal: 0,
        total: 0,
        tax: 0
    }

    for (var i in cart){
        const item = cart[i]

        data.totalItemsCount = parseInt(data.totalItemsCount + item.quantity)
        data.subTotal = (data.subTotal + (item.quantity * parseFloat(item.price)))
    }
    if (data.subTotal){
        data.tax = (42 + 0)
        data.total = (data.subTotal + data.tax)
    }
    return (data)
}