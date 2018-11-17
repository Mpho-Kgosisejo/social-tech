import express from "express"
import MenuModel from "../models/MenuCategory"
import ProductModel from "../models/Product"
import { AsyncResource } from "async_hooks";

let menuWithProducts = []
const router  = express.Router()

//this will return all the menus
router.get("/", (req, res) => {
    MenuModel.find()
    .then(data => {
        res.status(200).json({
            message : "got the menu",
            data
        })
    })
    .catch(err => {
        console.log(err.errors.name.message)
        res.status(500).json({
            error : {
                message : "couldnt retrieve the list of menus from the database"
            }
        })
    })
})

// const func = async (data, f) => {
//     let newData = []
//     await data.map(el => {
//         const pro = await ProductModel.find({menuCategoryId: el._id})
//         .then(data2 => data2)
//         .catch(err => err)

//         // data.items = pro
//         newData.push({...data, items: pro})
//         // return newData
//     })
    
    
// }

router.get("/menu-products", (req, res) => {
    
    MenuModel.find()
    .populate('products')
    .then(data => {
        var menuWithProducts = []

        data.forEach(element => {
            ProductModel.find({menuCategoryId: element._id})
            .exec()
            .then(productData => {
                menuWithProducts.push({name: element.name, title : element.title, show: element.show, id : element._id, items: productData})
                console.log(menuWithProducts)
                if (data[data.length - 1] === element){
                    console.log("Lol... his sleepy")
                    res.status(200).json({
                        message : "got the nested menu",
                        menuWithProducts
                    })
                }
            })
            .catch(err => {
                console.log("error", err)
            })
        });
        res.status(200).json({
            message : "got the nested menu",
            menuWithProducts
        })
    })
    .catch(err => {
        res.status(500).json({
            error : {
                message : "couldnt retrieve the list of menus from the database"
            }
        })
    })

    // MenuModel.find()
    // .then(data => {
    //     func(data, null)

    //     // res.status(200).json({
    //     //     message : "OK",
    //     //     cat
    //     // })
    // })
    // .catch(err => {
    //     console.log(err.errors.name.message)
    //     res.status(500).json({
    //         error : {
    //             message : "couldnt retrieve the list of menus from the database"
    //         }
    //     })
    // })
})

//this will create a new menu
router.post("/", (req, res) => {
    const {name, title, show} = req.body
    const newMenu = MenuModel({
        name,
        title,
        show
    })
    newMenu.save().then(menu => {
        res.status(200).json({
            name,
            title,
            show
        })
    })
    .catch(err => {
        console.log(err.errors.name.message)
        res.status(500).json({
            error : {
                message : "couldnt post this menu category to the database"
            }
        })
    });
})

export default router