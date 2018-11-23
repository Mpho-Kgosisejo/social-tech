import UserModel from "../models/User"

export const update_info = (req, res) => {
    const {key} = req.auth_data
    const {firstname, lastname} = req.body

    UserModel.findByIdAndUpdate({_id: key}, {
        firstname,
        lastname
    }, {new: true})
    .then(user => {
        res.json({
            user,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            catch: err,
            error: {
                message: "Error updating user"
            }
        })
    })
}

export const update_avator = (req, res) => {
    const {key} = req.auth_data

    UserModel.findByIdAndUpdate({_id: key}, {
        image: req.file.path
    }, {new: true})
    .then(user => {
        res.json({
            avator: user.image,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            catch: err,
            error: {
                message: "Error updating user"
            }
        })
    })
}
