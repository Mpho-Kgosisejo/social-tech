/* eslint-disable no-console */
import OrderModel from "../models/Orders"
import Product from "../models/Product";
import NetEarning from "../models/NetEarning";
import { addUpdateNet } from "./netearning";

export const get_orders = (req, res) => {
    OrderModel.find()
    .sort({createdAt : -1})
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
    // TO:DO, use the uid to get a specific user's orders for the user profile page
    const uid = req.user._id
    const query = { customer : uid }

    OrderModel.find(query)
    .sort({createdAt : -1})
    .then (orders => {
        console.log("orders : >>>>>>> ", orders )
        res.status(200).json({
            orders,
            message : "got the users orders"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message : "failed to retrieve user orders.. user id might be invalid"
            }
        })    
    })
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
    const {collector, details, items, stripe} = req.body 
    const customer = req.user
    const newOrder = new OrderModel({
        customer,
        collector,
        details,
        items,
        stripe,
        status : "pending",
        delivery
    })   

    newOrder.save()
    .then(order => {
    
        items.forEach(product => {
            const numberOfOrders = Number(product.numberOfOrders) + 1
            Product.findByIdAndUpdate(product._id,  { numberOfOrders }, {new : true})
            .then(prdct => {
                console.log(">>>>>>>", prdct)
            })
            .catch(err => {
                console.log("=======", err)
            })
        });

        NetEarning.findOne()
        .then (netearnings => {
            const tempTotal = Number(netearnings.totalNet) + Number(details.total)
            NetEarning.db.db.listCollections({name: 'netearnings'})
            .next((err, collinfo) => {
                if (collinfo) {
                    NetEarning.findByIdAndUpdate(netearnings._id, { totalNet : tempTotal }, {new : true})
                    .then(netearnin => {
                        console.log("+++++++", netearnin)
                    })
                    .catch(errorr => {
                        console.log(errorr)
                    })
                }
                else{
                    const net = new NetEarning({
                        totalNet : tempTotal
                    })
                
                    net.save()
                    .then(netearnin => {
                        console.log(netearnin)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err
                }
            })
        })

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
    .then(updatedOrder => {
        res.status(200).json({
            updatedOrder,
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