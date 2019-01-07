import { Grid, Segment, Header, Icon, Divider, Table, Message, Modal, Button, Breadcrumb, Checkbox, Label } from "semantic-ui-react";
import Link from "next/link"
import validator from "validator"

import Layout from "../components/Layouts/Layout"
import TableItem from "../components/Layouts/Features/Cart/TableItem"
import { CartTablePlaceholder } from "../components/utils/Placeholders";
import ContextAPI from "../src/config/ContextAPI";

import OrderSummary from "../components/Layouts/Features/Cart/OrderSummary"
import Payment from "../components/Layouts/Features/Cart/Payment"
import api from "../src/providers/APIRequest"

const EmptyCart = () => (
    <Message >
        {/* <Icon name="world"/> */}
        <Message.Content>
            <Message.Header>Empty Cart</Message.Header>
            Go to <Link href="/menu" ><a>menu page</a></Link> and add items
        </Message.Content>
    </Message>
)

const Confirm = ({open, address, func}) => (
    <Modal open={open} basic size="small">
        <Header>Use your current saved address ?</Header>
        <Modal.Content>
            Address: <b>{address}</b>
        </Modal.Content>

        <Modal.Actions>
            <Button basic color="red" inverted onClick={() => func(false)}>
                <Icon name="remove" />
                No
            </Button>
            <Button basic color="green" inverted onClick={() => func(true)}>
                <Icon name="checkmark" />
                Yes
            </Button>
        </Modal.Actions>
    </Modal>
)

const PaymentSuccessComponent = ({open, handlePaymentSuccess, user, remember, cartDispatch}) => {

    return (
        <Modal
            open={open}
            onClose={() => handlePaymentSuccess({open: true})}
            basic
            size='small'
            className="paymentComponent"
        >
            <Header icon='checkmark' content='Payment Successful' />
            <h4 style={{margin: 0, marginLeft: 21}}>Transation was successful...</h4>
            <Modal.Content>
                <Divider />
                <h3>
                    Remember Collector's details?
                    <br/>
                    <span>Note! Details will be saved as user's details</span>
                </h3>
                <Checkbox
                    onChange={() => {cartDispatch({remember: {...remember, names: remember.names ? false : true}})}}
                    checked={remember.names}
                    label={<label style={{color: "rgb(193, 193, 193)"}} className={`${remember.names ? "bold" : ""}`}>Remember firstname & lastname? <b>{user.firstname} {user.lastname}</b></label>}
                />
                <br/>
                <Checkbox
                    onChange={() => {cartDispatch({remember: {...remember, phonenumber: remember.phonenumber ? false : true}})}}
                    checked={remember.phonenumber}
                    label={<label style={{color: "rgb(193, 193, 193)"}} className={`${remember.phonenumber ? "bold" : ""}`}>Remember phone number? <b>{user.phonenumber}</b></label>}
                />
            </Modal.Content>

            <Modal.Actions>
              <Button color='green' onClick={() => handlePaymentSuccess({open: true})} inverted>
                <Icon name='checkmark' /> Ok
              </Button>
            </Modal.Actions>
        </Modal>
    )
}

class Cart extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            paymentLoading: false,
            delivery: false,
            openConfirm: false,
            paymentSuccess: false, 
            useSavedAddress: null,
            user: {
                firstname: "",
                lastname: "",
                phonenumber: ""
            },
            userErrors: {},
            step: "order",
            remember: {
                names: false,
                phonenumber: false
            }
        }
    }

    isUserValid = (user = null) => {
        const errors = {}
        const {firstname, lastname, phonenumber} = user ? user : this.state.user

        if (validator.isEmpty(firstname, {ignore_whitespace: true}))
            errors.firstname = '"Firstname" is required'
        if (validator.isEmpty(lastname, {ignore_whitespace: true}))
            errors.lastname = '"Lastname" is required'
        if (validator.isEmpty(phonenumber, {ignore_whitespace: true}))
            errors.phonenumber = '"Phone Number" is required'
        return (errors)
    }

    validatorUser = () => {
        const errors = this.isUserValid()
        
        if (Object.keys(errors).length > 0){
            this.setState({
                ...this.state,
                userErrors: errors
            })
        }else{
            this.setState({
                ...this.state,
                userErrors: errors,
                paymentLoading: true
            })
        }
        
    }

    handleUserUpdate = () => {
        console.log("this.handleUserUpdate()")
    }

    cartDispatch = payload => this.setState({
        ...this.state,
        ...payload
    })

    handlePaymentSuccess = ({close = true}) => {
        if(close){
            const {remember} = this.state
            
            if (remember.names || remember.phonenumber){
                const {firstname, lastname, phonenumber} = this.state.user
                // const user = {
                //     ...this.props.account.personal_details,
                //     firstname: remember.names ? firstname : this.props.account.personal_details.firstname,
                //     firstname: remember.names ? lastname : this.props.account.personal_details.lastname,
                //     firstname: remember.names ? phonenumber : this.props.account.personal_details.phone
                // }

                console.log("POST => update user's details", "user")
                this.setState({user: {
                    firstname: "",
                    lastname: "",
                    phonenumber: ""
                }})
            } 
        
            this.setState({paymentSuccess: false})
        }else{
            this.setState({paymentSuccess: true})
        }
    }

    handleOnProceedPayment = ({proceed = true}) => {
        if (proceed){
            this.setState({step: "payment"})
        }else{
            this.setState({step: "order"})
        }
    }

    toggleDelivery = ({state}) => {
        const {dispatch, login, account} = state

        if (this.state.delivery){
            dispatch({type: "CART_DELIVERY", payload: {}})
            this.setState({delivery: false})
        }
        else{
            if (Object.keys(login).length > 0 && Object.keys(account).length > 0 && account.personal_details.address)
                this.setState({delivery: true, openConfirm: true})
            else
                this.setState({delivery: true, useSavedAddress: false})
        }
    }

    confirm = (confirm) => {
        if (confirm)
            this.setState({useSavedAddress: true, openConfirm: false})
        else
            this.setState({useSavedAddress: false, openConfirm: false})
    }

    componentDidMount(){
        const {dispatch, state} = this.props

        // setTimeout(() => {
        if (state.account.personal_details){
            const {firstname, lastname, phone} = state.account.personal_details
            const user = {}

            if (firstname)
                user.firstname = firstname
            if (lastname)
                user.lastname = lastname
            if (phone)
                user.phonenumber = phone
            
            this.setState({
                user: {
                    ...this.state.user,
                    ...user
                }
            })
        }
        // }, 2000)
        
        setTimeout(() => {
            this.setState({loading: false, userErrors: this.isUserValid()})
        }, 50)

        dispatch({type: "SIDEBAR", payload: false})
        dispatch({type: "PAGE", payload: "cart"})
        dispatch({type: "CART_DELIVERY", payload: {}})
    }

    handleCheckout = async ({data, cart}) => {
        this.setState({paymentSuccess: true, delivery: false})
        const {dispatch} = this.props
        const order = {
            ...cart,
            items: cart.items,
            stripe: {
                id: data.id
            }
        }

        const res = await api.orders.add_order(order)
        console.log("order", order)
        
        dispatch({type: "CART", payload: []})
        if (res.status === 200){
            // dispatch({type: "ALERT_PORTAL", payload: {
            //     open: true,
            //     message: "Payment success"
            // }})
        }else{
            dispatch({type: "ALERT_PORTAL", payload: {
                open: true,
                type: "error",
                header: "Error Saving Order Details",
                message: "Please check your email and contact Fresh Eats right away."
            }})
        }
    }

    render(){
        const {loading, delivery, openConfirm, useSavedAddress, step, paymentSuccess, paymentLoading, user, remember} = this.state

        return (
            <Layout title="Cart">
                <ContextAPI.Consumer>
                    {({state}) => {
                        const {cart} = state
                        const {address} = state.account.personal_details || ""

                        return(
                            <>
                                <Confirm open={openConfirm} address={address} func={this.confirm} />
                                <PaymentSuccessComponent cartDispatch={this.cartDispatch} remember={remember} user={user} handlePaymentSuccess={this.handlePaymentSuccess} open={paymentSuccess} />

                                <Divider hidden />
                                <Header as="h3" color="grey">
                                    <Icon name="cart" size="mini"/>
                                    My Cart ({cart.details.itemsCount})
                                </Header>

                                <Divider />
                                
                                <Grid className="cart">
                                    <Grid.Row>
                                        <Grid.Column computer={10} tablet={16} mobile={16}>
                                            <Segment>
                                                {loading ?
                                                    <>
                                                        <Table basic="very" celled>
                                                            <CartTablePlaceholder />
                                                        </Table>
                                                    </> :
                                                    <>
                                                        {state.cart.items.length > 0 ? 
                                                            state.cart.items.map((item, i) => (
                                                                <Table key={i} basic="very" celled>
                                                                    <TableItem {...item} step={step} />
                                                                </Table>
                                                            )) :
                                                            <EmptyCart />
                                                        }
                                                    </>
                                                }
                                            </Segment>
                                        </Grid.Column>
                                        <Grid.Column computer={6} tablet={16} mobile={16}>
                                            <Segment className="order">
                                                <Breadcrumb size="huge">
                                                    <Breadcrumb.Section active={step === "order"}>Order Summary</Breadcrumb.Section>
                                                    <Breadcrumb.Divider icon="right chevron" />

                                                    <Breadcrumb.Section active={step === "payment"}>Payment</Breadcrumb.Section>
                                                </Breadcrumb>
                                                <Divider />
                                                
                                                {step === "order" ?
                                                    <OrderSummary
                                                        funcs={{
                                                            cartDispatch: this.cartDispatch,
                                                            isUserValid: this.isUserValid,
                                                            validatorUser: this.validatorUser
                                                        }}
                                                        cartState={this.state}
                                                        handleCheckout={this.handleCheckout}
                                                        handleOnProceedPayment={this.handleOnProceedPayment}
                                                        useSavedAddress={useSavedAddress}
                                                        deliveryObj={{delivery, toggleDelivery: this.toggleDelivery}}
                                                        paymentLoading={paymentLoading}
                                                    />
                                                    :
                                                    <Payment handleOnProceedPayment={this.handleOnProceedPayment} />
                                                }
                                            </Segment>
                                        </Grid.Column>  
                                    </Grid.Row>
                                </Grid>
                            </>
                        )
                    }}
                </ContextAPI.Consumer>
            </Layout>
        )
    }
}

export default Cart