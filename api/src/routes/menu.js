import express from "express"
import CategoryModel from "../models/MenuCategory"
import ProductModel from "../models/Product"

const router  = express.Router()

// this will return all the menus
router.get("/", (req, res) => {

    const findCategories = new Promise((resolve, reject) => {
        CategoryModel.find({}, function(err, CategoryData) {
            if (err) reject(err);
            resolve(CategoryData)                   
         });
      })
  
      // Find all prducts
      // the query action below is not executed, just return PromiseObject for now
      const findProducts = new Promise((resolve, reject) => {
        ProductModel.find({}, function(err, productData) {
            if (err) reject(err);
            resolve(productData)
        });
      })

    return Promise.all([findCategories, findProducts])
    .then(data => {            
        const menuWithProducts = [];
        
        data[0].forEach(ctrgry => {
            data[1].forEach(prdct => { 
                if (ctrgry._id == prdct.menuCategoryId){
                    ctrgry["items"].push(prdct)
                }
            })
            menuWithProducts.push(ctrgry)
        })

        res.status(200).json({
            message : "got the nested menu",
            menuWithProducts
        })
    })

    // MenuModel.find()
    // .populate("category", "name title show")
    // .populate("items", "menuCategoryId ingredients description image available price")
    // .exec()
    // .then(categories => {
    //     res.status(200).json({
    //         categories
    //     })
    // })
    // .catch(err => {
    //     res.status(404).json({
    //         error: {
    //             message : "error getting menu"   
    //         }
    //     })
    // })

})


// this will return all menu-categories
router.get("/menu-categories", (req, res) => {
    CategoryModel.find()
    .then(data => {
        res.json({
            data,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(404).json({
            error: {
                message: "error..."
            }
        })
    })
})

// this will create a new menu
router.post("/", (req, res) => {
    const {name, title, show} = req.body

    const newMenu = CategoryModel({
        name,
        title,
        show
    })
    newMenu.save().then(menu => {
        res.status(200).json({
            menu
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : {
                message : "couldnt post this menu category to the database"
            }
        })
    });
})

export default router