import { Grid, Segment, Header, Icon, Divider, Table, Message, Modal, Button } from "semantic-ui-react";
import Link from "next/link"

import Layout from "../components/Layouts/Layout"
import TableItem from "../components/Layouts/Features/Cart/TableItem"
import { CartTablePlaceholder } from "../components/utils/Placeholders";
import ContextAPI from "../src/config/ContextAPI";

import OrderSummary from "../components/Layouts/Features/Cart/OrderSummary"

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

class Cart extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            delivery: false,
            openConfirm: false,
            useSavedAddress: null
        }
    }

    toggleDelivery = ({state}) => {
        const {dispatch, login} = state

        if (this.state.delivery){
            dispatch({type: "CART_DELIVERY", payload: {}})
            this.setState({delivery: false})
        }
        else{
            if (Object.keys(login).length > 0)
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
        this.setState({loading: false})

        this.props.dispatch({type: "SIDEBAR", payload: false})
        this.props.dispatch({type: "PAGE", payload: "cart"})
    }

    render(){
        const {loading, delivery, openConfirm, useSavedAddress} = this.state

        return (
            <Layout title="Cart">
                <ContextAPI.Consumer>
                    {({state}) => {
                        const {cart} = state
                        const {address} = state.account.personal_details

                        return(
                            <>
                                <Confirm open={openConfirm} address={address} func={this.confirm} />

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
                                                                    <TableItem {...item} />
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
                                                <OrderSummary useSavedAddress={useSavedAddress} deliveryObj={{delivery, toggleDelivery: this.toggleDelivery}} />
                                            </Segment>
                                        </Grid.Column>  
                                    </Grid.Row>
                                </Grid>
                            </>
                        )
                    }}
                </ContextAPI.Consumer>
                {/* <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ"}&libraries=places`}></script>  */}
            </Layout>
        )
    }
}

export default Cart