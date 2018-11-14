import {Message} from "semantic-ui-react"

export const ErrorMessage = ({header = "", message}) => (
    <Message negative header={header} content={message} />
)

export const SuccessMessage = ({header = "", message}) => (
    <Message success header={header} content={message} />
)

export const WarningMessage = ({header = "", message}) => (
    <Message warning header={header} content={message} />
)

export const InfoMessage = ({header = "", message}) => (
    <Message info header={header} content={message} />
)

export const MainMessage = ({type = "info", header = "", message}) => {
    if (type === "error"){
        return (<ErrorMessage header={header} message={message} />)
    }
    else if (type === "success"){                                                                                                                    
        return (<SuccessMessage header={header} message={message} />)
    }
    else if (type === "warning"){
        return (<WarningMessage header={header} message={message} />)
    }else{
        return (<InfoMessage header={header} message={message} />)
    }
}