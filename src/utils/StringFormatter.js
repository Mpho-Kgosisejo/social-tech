export const list = ({list = [], separator = ",", last_separator = "and"}) => {
    var message = ""

    for (const i in list){
        const str = list[i]

        if (list.indexOf(str) === 0)
            message += (`${str}`)
        else if ((list.length - 1) === list.indexOf(str))
            message += (` ${last_separator} ${str}`)
        else
            message += (`${separator} ${str}`)
    }
    return (message)
}