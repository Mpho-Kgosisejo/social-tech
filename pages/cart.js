import { Grid, Segment, Header, Icon, Divider, Table, Message, Modal, Button, Breadcrumb } from "semantic-ui-react";
import Link from "next/link"

import Layout from "../components/Layouts/Layout"
import TableItem from "../components/Layouts/Features/Cart/TableItem"
import { CartTablePlaceholder } from "../components/utils/Placeholders";
import ContextAPI from "../src/config/ContextAPI";

import OrderSummary from "../components/Layouts/Features/Cart/OrderSummary"
import Payment from "../components/Layouts/Features/Cart/Payment"
import api from "../src/providers/APIRequest";

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

const PaymentSuccessComponent = ({open, handlePaymentSuccess}) => (
    <Modal
        open={open}
        onClose={() => handlePaymentSuccess({open: true})}
        basic
        size='small'
      >
        <Header icon='checkmark' content='Payment Successful' />
        <Modal.Content>
          <h4>Transation was successful...</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => handlePaymentSuccess({open: true})} inverted>
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
)

class Cart extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            delivery: false,
            openConfirm: false,
            paymentSuccess: false, 
            useSavedAddress: null,
            step: "order"
        }
    }

    handlePaymentSuccess = ({close = true}) => close ? this.setState({paymentSuccess: false}) : this.setState({paymentSuccess: true})

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
        const {dispatch} = this.props
        this.setState({loading: false})

        dispatch({type: "SIDEBAR", payload: false})
        dispatch({type: "PAGE", payload: "cart"})
        dispatch({type: "CART_DELIVERY", payload: {}})
    }

    handleCheckout = async ({data, cart}) => {
        const {dispatch} = this.props
        const order = {
            ...cart,
            items: cart.items.map(item => item._id),
            stripe: {
                id: data.id
            }
        }

        this.setState({paymentSuccess: true, delivery: false})
        const res = await {status: 200}//api.cart.order({order})
        
        dispatch({type: "CART", payload: []})
        if (res.status === 200){
            console.log("handleCheckout()", order)
            // dispatch({type: "ALERT_PORTAL", payload: {
            //     open: true,
            //     message: "Payment success"
            // }})
        }else{
            console.error("Error") 
            // dispatch({type: "ALERT_PORTAL", payload: {
            //     open: true,
            //     type: "error",
            //     message: "Some Error!"
            // }})
        }
    }

    render(){
        const {loading, delivery, openConfirm, useSavedAddress, step, paymentSuccess} = this.state

        return (
            <Layout title="Cart">
                <ContextAPI.Consumer>
                    {({state}) => {
                        const {cart} = state
                        const {address} = state.account.personal_details || ""

                        return(
                            <>
                                <Confirm open={openConfirm} address={address} func={this.confirm} />
                                <PaymentSuccessComponent handlePaymentSuccess={this.handlePaymentSuccess} open={paymentSuccess} />

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
                                                            state.cart.items.map(item => (
                                                                <Table key={item.count} basic="very" celled>
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
                                                    <OrderSummary handleCheckout={this.handleCheckout} handleOnProceedPayment={this.handleOnProceedPayment} useSavedAddress={useSavedAddress} deliveryObj={{delivery, toggleDelivery: this.toggleDelivery}} />
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