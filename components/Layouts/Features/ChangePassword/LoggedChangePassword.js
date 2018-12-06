import { Modal, Grid, Form, Button, Divider } from "semantic-ui-react";

import ContextAPI from "../../../../src/config/ContextAPI"
import { onChangeInput } from "../../../../src/utils/IO";
import api from "../../../../src/providers/APIRequest";
import { FIELD_CANT_BE_EMPTY, PASSWORD_MISMATCH, valueMustBeInLength } from "../../../../src/Types/MessageTypes";
import { MainMessage } from "../../../Messages/Message";
import { InLineError } from "../../../Messages/InLineMessage";

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
    const {loading, errors} = props

    return (
        <ContextAPI.Consumer>
            {({state}) => (
                 <Form loading={loading}>
                    <Form.Field error={errors.newPassword !== undefined}>
                        <label>New Password</label>
                        <input type="password" name="password" placeholder="New Password" value={props.password} onChange={(e) => props.dispatch(props, onChangeInput({props, e}))} />
                        {errors.newPassword && <InLineError message={errors.newPassword}/>}
                    </Form.Field>
                    <Form.Field error={errors.confirmPassword !== undefined}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={props.confirmPassword} onChange={(e) => props.dispatch(props, onChangeInput({props, e}))} />
                        {errors.confirmPassword && <InLineError message={errors.confirmPassword}/>}
                    </Form.Field>

                    <Button fluid type="submit" loading={loading} onClick={() => changePassword({dispatch: state.dispatch, login: state.login})}>
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
            open: false,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            isFirstStep: false,
            loading: false,
            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: ""
            },
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
            this.setState({
                isFirstStep: true,
                feedback: {
                    type: "info",
                    header: "",
                    message: ""
                },
                oldPassword: ""
            })
            dispatch({type: "ALERT_PORTAL", payload: {open: true, message: "Password verified"}})
        }else{
            this.setState({feedback: {
                type: "error",
                header: "",
                message: res.data.error.message
            }})
        }
        this.setState({loading: false})
    }

    changePassword = async ({dispatch, login}) => {
        const errors = this.validate({
            newPassword: this.state.password,
            confirmPassword: this.state.confirmPassword
        })

        this.setState({errors})
        if (Object.keys(errors).length <= 0){
            this.setState({loading: true})
            const res = await api.user.changePassword({
                token: login.token,
                password: this.state.password
            })

            if (res.status === 200){
                this.setState({
                    loading: false,
                    password: "",
                    confirmPassword: "",
                    feedback: {
                        type: "success",
                        header: "",
                        message: res.data.message
                    },
                    isFirstStep: false
                })
                dispatch({type: "ALERT_PORTAL", payload: {open: true, message: "res.data.message"}})
            }else{
                this.setState({
                    loading: false,
                    feedback: {
                        type: "error",
                        header: "",
                        message: res.data.error.message
                    }
                })
            }
        }
    }

    componentDidMount(){
        this.resetState()
    }

    resetState = () => {
        this.setState({
            ...this.state,
            open: false,
            oldPassword: "",
            password: "",
            confirmPassword: "",
            isFirstStep: false
        })
    }

    validate = ({newPassword, confirmPassword}) => {
        const errors = {}
        const password_len = 6

        if (!newPassword){
            errors.newPassword = FIELD_CANT_BE_EMPTY
        }else{
            if (newPassword.length < password_len)
                errors.newPassword = valueMustBeInLength(password_len)
            else{
                if (confirmPassword !== newPassword)
                    errors.confirmPassword = PASSWORD_MISMATCH
            }
        }
        return (errors)
    }

    openModal = () => this.setState({open: true})

    closeModal = () => this.setState({open: false})

    render(){
        const {isFirstStep, feedback, open} = this.state

        return (
            <>
                <a href="#" onClick={this.openModal}>Change Password</a>

                <Modal open={open} >
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Grid columns="equal">
                                <Grid.Column only="computer tablet" className="padding-zero" />
                                <Grid.Column mobile={16} tablet={10} computer={8}>
                                    {feedback.message && <MainMessage type={feedback.type} header={feedback.header} message={feedback.message} />}
                                    <ContextAPI.Consumer>
                                        {({state}) => (
                                            isFirstStep ? <ChangePassword changePassword={this.changePassword} props={{...this.state}} /> : <ValidateOldPassword verifyOldPassword={this.verifyOldPassword} props={{...this.state}} />
                                        )}
                                    </ContextAPI.Consumer>
                                    <Button onClick={this.closeModal} fluid color="google plus" style={{marginTop: "10px"}}>Close</Button>
                                </Grid.Column>
                                <Grid.Column only="computer tablet" />
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </>
        )
    }
}

export default LoggedChangePassword