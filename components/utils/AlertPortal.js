import { Portal, Segment, Header, Divider } from "semantic-ui-react";
import ContextAPI from "../../src/config/ContextAPI";

const AlertPortal = () => {
    const close = (dispatch) => {
        setTimeout(() => {
            dispatch({type: "ALERT_PORTAL", payload: {type: "", header: "", message: "", open: false}})
        }, 3000)
    }

    const Alert = ({type = "normal", header = "", message = ""}) => (
        <React.Fragment>
            {header && (
                <>
                    <Header as="h5">{header}</Header>
                    <Divider />
                </>
            )}
            {message}
        </React.Fragment>
    )

    return (
        <ContextAPI.Consumer>
            {({state}) => {
                const {open, type, header, message} = state.alertPortal
                
                return (message && (
                    <Portal open={open} onMount={() => close(state.dispatch)} className="alert-portal">
                        <Segment style={{ left: '5%', top: '5%', position: 'fixed', zIndex: 1000 }}>
                            <Alert type={type} header={header} message={message} />
                        </Segment>
                    </Portal>
                ))
            }}
        </ContextAPI.Consumer>
    )
}

export default AlertPortal