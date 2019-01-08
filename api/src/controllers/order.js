import OrderModel from "../models/Orders"

export const get_orders = (req, res) => {
    OrderModel.find()
    .sort({date : -1})
    .then(orders => {
        // console.log(orders)
        res.status(200).json({
            orders,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            catch: err,
            error: {
                message: "Error retrieving orders"
            }
        })
    })
}

export const get_user_orders = (req, res) => {
    //TO:DO, use the uid to get a specific user's orders for the user profile page
}

export const get_order = (req, res) => {
    const id = req.params.id
    console.log(id)
    OrderModel.findById(id)
    .then(order => {
        res.status(200).json({
            order,
            message : "ok"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: {
                message : "order could not be found"
            }
        })
    })
}


export const add_order = (req, res) => {
    const {customer, details, items, stripe, status} = req.body 
    const newOrder = new OrderModel({
        customer,
        details,
        items,
        stripe,
        status
    })   

    newOrder.save()
    .then(order => {
        res.status(200).json({
            order,
            message : "successfully added the order"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(501).json({
            error : {
                catch: err,
                message : "could not add the order to the database"
            }
        })
    })
}

export const update_order = (req, res) => {
    console.log(req.body)

    OrderModel.findByIdAndUpdate(req.body._id, req.body, {new : true})
    .then(updated_order => {
        res.status(200).json({
            updated_order,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(501).json({
            error : {
                message : "Couldnt update the order",
            }
        })
    })
}

export const delete_order = (req, res) => {
    const id = req.body._id
    console.log(req.body)
    OrderModel.findByIdAndUpdate(order._id)
    .then(deleted_order => {
        res.status(200).json({
            delete_order,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(501).json({
            error : {
                message : "Couldnt delete the order",
            }
        })
    })
}