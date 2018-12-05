import { Modal, Grid, Form, Button, Divider } from "semantic-ui-react";

import ContextAPI from "../../../../src/config/ContextAPI"
import { onChangeInput } from "../../../../src/utils/IO";
import api from "../../../../src/providers/APIRequest";

const ValidateOldPassword = ({props, verifyOldPassword}) => {

    return (
        <ContextAPI.Consumer>
            {({state}) => (
                 <Form loading={props.loading}>
                    <Form.Field>
                        <label>Old Password</label>
                        <input type="password" name="oldPassword" placeholder="Old Password" value={props.oldPassword} onChange={(e) => props.dispatch(props, onChangeInput({props, e}))} />
                    </Form.Field>

                    <Button fluid type="submit" loading={props.loading} onClick={() => verifyOldPassword({dispatch: state.dispatch, login: state.login})}>
                        Verify Password
                    </Button>
                </Form>
            )}
        </ContextAPI.Consumer>
    )
}

const ChangePassword = ({props, changePassword}) => {

    return (
        <ContextAPI.Consumer>
            {({state}) => (
                 <Form loading={props.loading}>
                    <Form.Field>
                        <label>New Password</label>
                        <input type="password" name="password" placeholder="New Password" value={props.password} onChange={(e) => props.dispatch(props, onChangeInput({props, e}))} />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={props.confirmPassword} onChange={(e) => props.dispatch(props, onChangeInput({props, e}))} />
                    </Form.Field>

                    <Button fluid type="submit" loading={props.loading} onClick={() => changePassword({dispatch: state.dispatch, login: state.login})}>
                        Change Password
                    </Button>
                </Form>
            )}
        </ContextAPI.Consumer>
    )
}

class LoggedChangePassword extends React.Component {
    constructor(){
        super()

        this.state = {
            oldPassword: "",
            isFirstStep: false,
            loading: false,
            dispatch: (state, payload) => this.setState({...state, ...payload})
        }
    }

    verifyOldPassword = async ({dispatch, login}) => {
        this.setState({loading: true})
        const res = await api.user.signin({
            login: {
                key: "email",
                value: "mpho.kgosisejo@hotmail.com"
            },
            password: this.state.oldPassword
        })

        if (res.status === 200){
            this.setState({isFirstStep: true})
            dispatch({type: "ALERT_PORTAL", payload: {open: true, header: "Password Verified", message: "You can now change your password"}})
        }else{
            console.log("Error")
        }
        this.setState({loading: false})
    }

    changePassword = async ({dispatch, login}) => {
        this.setState({loading: true})
        const res = await api.user.changePassword({
            token: login.token,
            password: this.state.password
        })

        console.log("error", res.data)
        if (res.status === 200){
            dispatch({type: "ALERT_PORTAL", payload: {open: true, message: res.data.message}})
        }else{
            console.log("Error")
        }
        this.setState({loading: false})
    }

    componentDidMount(){
        this.resetState()
    }

    resetState = () => {
        this.setState({
            ...this.state,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            isFirstStep: false
        })
    }

    render(){
        const {isFirstStep, oldPassword} = this.state

        return (
            <Modal open={true} >
            {/* <Modal trigger={<a href="#" onClick={() => {console.log("Click Me!")}}>Change Password</a>}> */}
                <Modal.Header>Change Password</Modal.Header>
                <Modal.Content scrolling>
                    <Modal.Description>
                        <Grid columns="equal">
                            <Grid.Column />
                            <Grid.Column mobile={16} tablet={10} computer={8}>
                                <ContextAPI.Consumer>
                                    {({state}) => (
                                        isFirstStep ? <ChangePassword changePassword={this.changePassword} props={{...this.state}} /> : <ValidateOldPassword verifyOldPassword={this.verifyOldPassword} props={{...this.state}} />
                                    )}
                                </ContextAPI.Consumer>
                            </Grid.Column>
                            <Grid.Column />
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoggedChangePassword