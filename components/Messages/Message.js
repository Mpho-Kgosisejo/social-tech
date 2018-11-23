import {Message} from "semantic-ui-react"

export const ErrorMessage = ({header = "", icon= null, message}) => (
    <Message negative header={header} icon={icon} content={message} />
)

export const SuccessMessage = ({header = "", icon= null, message}) => (
    <Message success header={header} icon={icon} content={message} />
)

export const WarningMessage = ({header = "", icon= null, message}) => (
    <Message warning header={header} icon={icon} content={message} />
)

export const InfoMessage = ({header = "", icon= null, message}) => (
    <Message info header={header} icon={icon} content={message} />
)

export const MainMessage = ({type = "info", icon= null, header = "", message}) => {
    if (type === "error"){
        return (<ErrorMessage header={header} icon={icon} message={message} />)
    }
    else if (type === "success"){                                                                                                                    
        return (<SuccessMessage header={header} icon={icon}  message={message} />)
    }
    else if (type === "warning"){
        return (<WarningMessage header={header} icon={icon}  message={message} />)
    }else{
        return (<InfoMessage header={header} icon={icon}  message={message} />)
    }
}