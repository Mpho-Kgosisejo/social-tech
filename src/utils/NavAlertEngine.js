import {list} from "../utils/StringFormatter" 

const navalert_dispatch = ({dispatch, payload}) => dispatch({type: "NAV_ALERT", payload})

export const close = dispatch => navalert_dispatch({dispatch, payload: {show: false}})

export const toggleShowAll = ({dispatch, showAll}) => showAll ? navalert_dispatch({dispatch, payload: {showAll: false}}) : navalert_dispatch({dispatch, payload: {showAll: true}})

export const put = ({state, alert}) => {
    const {dispatch, nav_alert} = state

    /* 
        Nav-Alert structure:

        {
            show: true,
            showAll: false,
            list: [
                {
                    icon: "exclamation",
                    header: {
                        href: "",
                        text: ""
                    },
                    message: ""
                }
            ]
        }
    */

    navalert_dispatch({dispatch, payload: {
        show: true,
        showAll: false,
        list: nav_alert.list.concat(alert)
    }})
}

export const getUpdateProfileMessage = ({account}) => {
    if (!account.personal_details)
        return ("")
    
    const {email, firstname, lastname, phone} = account.personal_details
    const missingElements = []

    if (!email)
        missingElements.push("email")
    if (!firstname)
        missingElements.push("firstname")
    if (!lastname)
        missingElements.push("lastname")
    if (!phone)
        missingElements.push("phone number")
    return (list({list: missingElements}))
}

export const isValidList = list => {
    if (!list || Object.keys(list).length <= 0)
        return (false)
    for (var i in list){
        if (!list[i].message)
            return (false)
    }
    return (true)
}