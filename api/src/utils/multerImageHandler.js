import multer from "multer"
import fs from "fs"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./${process.env.UPLOADS_PATH}`)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    } else {
        cb(new Error("Only images of *.jpeg, *jpg and *.png are allowed"), false)
    }
}

export const multerUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: (1024 * 1024) * 1
    }
})

export const removeFile = (path, callback = null) => {
    fs.unlink(`./${path}`, (err) => {

        if (callback != null){
            callback(err)
        }
    })
}

export default multer