import express from "express"
import CategoryModel from "../models/MenuCategory"
import ProductModel from "../models/Product"
import checkAuth from "../middleware/checkAuth"

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

})


// this will return all menu-categories
router.get("/menu-categories", (req, res) => {
    CategoryModel.find()
    .then(data => {
        res.status(200).json({
            data,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(404).json({
            error: {
                message: err
            }
        })
    })
})

// this will create a new menu
router.post("/", checkAuth, (req, res) => {
    const {name, title, show} = req.body

    const newMenu = CategoryModel({
        name,
        title,
        show
    })
    newMenu.save().then(menu => {
        CategoryModel.find()
            .then(data => {
                res.status(200).json({
                    data,
                    message: "OK"
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: {
                        message: err
                    }
                })
            })
    })
    .catch(err => {
        res.status(501).json({
            error : {
                message : "Couldnt add category to the database"
            }
        })
    });
})

router.delete("/", checkAuth, (req, res) => {
    console.log(req.body._id)

    CategoryModel.findByIdAndRemove(req.body._id)
    .then(result => {
        ProductModel.deleteMany({menuCategoryId : req.body._id})
        .then(_result => {
            CategoryModel.find()
            .then(data => {
                res.status(200).json({
                    data,
                    message: "OK"
                })
            })
            .catch(err => {
                res.status(404).json({
                    error: {
                        message: err
                    }
                })
            })
        })
        .catch(err => {
            res.status(501).json({
                error : {
                    message : "Couldnt delete category's items",
                    ress : req.body,
                }
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(501).json({
            error : {
                message : "Couldnt delete the category",
                ress : req.body,
            }
        })
    })
})

export default router