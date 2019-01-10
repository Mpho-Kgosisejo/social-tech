import CateringModel from '../models/Catering'

/**
 * Used to add a new Catering Event
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.body [Object, {name: [String], phone: [String], email: [String], event: [String], date: [Date], numberOfPeople: [Number], location: [String], description: [String]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {event: [Object, "The event that was Posted"], message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const add = (req, res) => {
    const newCateringEvent = new CateringModel({...req.body})

    newCateringEvent.save()
    .then(cateringEvent => {
        res.json({cateringEvent, message: "OK"})
    })
    .catch(err => {
        res.status(500).json({
            error: {
                catch: err,
                message: "Error creating Catering Event"
            }
        })
    })
}

/**
 * [Authorization Required]
 * Used to remove/delete an Event.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * @param req.param [Object, {id: [String, "ID of the event to be Deleted"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {event: [Object, "The event that was Deleted"], message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const remove = (req, res) => {
    CateringModel.findByIdAndRemove(req.params.id)
    .then(event => {
        if (event){
            res.json({
                event,
                message: "Event removed"
            })
        }else{
            res.status(404).json({
                error: {
                    message: "Event not found"
                }
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            error: {
                catch: err,
                message: "Error getting an event"
            }
        })
    })
}

/**
 * [Authorization Required]
 * Used to update an Event.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * @param req.param [Object, {id: [String, "ID of the event to be Updated"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {event: [Object, "The event that was Updated"], message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const update = (req, res) => {
    CateringModel.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
    .then(event => {
        res.json({
            event,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                catch: err,
                message: "Error getting an event"
            }
        })
    })
}

/**
 * [Authorization Required]
 * Used to get One Event.
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * @param req.param [Object, {id: [String, "ID of the event to be Returned"]}]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {event: [Object, "The event itself"], message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const getOne = (req, res) => {
    CateringModel.findById(req.params.id)
    .then(event => {
        res.json({
            event,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                catch: err,
                message: "Error getting an event"
            }
        })
    })
}

/**
 * [Authorization Required]
 * Used to get all Events
 * 
 * @param req represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
 * @param req.headers.authorization [String, "User's token"]
 * 
 * @param res represents the HTTP response when it gets an HTTP request.
 * @param res.success [Object: {events: [Array<Object>, "All events"], count: [Number, "Number of all events"], message: [String]}]
 * @param res.error [Object: {catch: [Object, "Catched error..."], error: {message: [String]}}]
 */
export const getAll = (req, res) => {
    CateringModel.find()
    .then(events => {
        res.json({
            count: events.length,
            events,
            message: "OK"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                catch: err,
                message: "Error getting all events"
            }
        })
    })
}