import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./${process.env.UPLOADS_PATH}`)
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}-${file.originalname}`)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(new Error("Only images of *.jpeg and *.png are allowed"), false)
    }
}


export const multerUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: (1024 * 1024) * 1
    }
})

export default multer