import _ from "lodash"

export default ({errors = {}, message = "Something went wrong"}) => {
    const result = {}

    if (Object.keys(errors).length > 0){
        _.forEach(errors, (val, key) => {
            result[key] = val.message
        })
    } else {
        result.message = message
    }
    return result
}