import NetEarning from "../models/NetEarning";

// eslint-disable-next-line import/prefer-default-export
export const addUpdateNet = (req, res) => {
    NetEarning.db.db.listCollections({name: 'netearnings'})
    .next((err, collinfo) => {
        
        if (collinfo) {
            NetEarning.findByIdAndUpdate(req.body._id, req.body, {new : true})
            .then(netearnings => {
                // we wont be returning anything in our request, we just want to add and not check the data sent back
                console.log(netearnings)
                res.status(200).json({
                    message: "OK"
                })
            })
            .catch(errr => {
                res.status(500).json({
                    error: {
                        message: errr
                    }
                })
            })
        }
        else{
            const net = new NetEarning({
                totalNet : req.body.totalNet
            })
        
            net.save()
            .then(netearnings => {
                res.status(200).json({
                    netearnings,
                    message: "OK"
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: {
                        message: err
                    }
                })
            })
        }
    });    
}