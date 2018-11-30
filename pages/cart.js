import { Grid, Segment, Header, Icon, Divider, Table, Button, Message, Checkbox } from "semantic-ui-react";
import Link from "next/link"

import Layout from "../components/Layouts/Layout"
import TableItem from "../components/Layouts/Features/Cart/TableItem"
import { CartTablePlaceholder } from "../components/utils/Placeholders";
import ContextAPI from "../src/config/ContextAPI";
import PlaceSearch from "../components/Layouts/Features/Cart/PlaceSearch"

import GoogleMaps from "../components/utils/GoogleMaps"
import { readyToProcessDelivery } from "../src/providers/CartHandler";

const OrderSummary = ({deliveryObj}) => (
    <ContextAPI.Consumer>
        {({state}) => {
            const {subTotal, total, totalItemsCount, tax} = state.cart.details
            const {distance, cost} = state.cart.delivery

            return (
                <React.Fragment>
                    <Header as="h3">Order Summary</Header>
                    <Divider />
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3">Sub. total ({totalItemsCount}):</Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Header>{`R${subTotal}`}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3">TAX:</Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Header>R{!subTotal? "0" : `${tax}`}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column >
                                <Header className="zero-margin">Delivery? <span>({deliveryObj.delivery ? "On" : "Off"})</span></Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Checkbox toggle disabled={(total <= 0)} onChange={() => deliveryObj.toggleDelivery(state.dispatch)} />
                            </Grid.Column>
                        </Grid.Row>
                        {deliveryObj.delivery && (
                                <>
                                    <Grid.Row className="total">
                                        <Grid.Column>
                                        <div className="map-container">
                                            <GoogleMaps
                                                initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                destination={null}
                                            />
                                        </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className="total">
                                        <Grid.Column>
                                            <Header as="h3">
                                                Delivery cost:<br/>
                                                <span>Distance of: <b>{distance ? distance.text : "0 km"}</b></span>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="right">
                                            <Header>{`R${cost ? cost : "0"}`}</Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </>
                            )
                        }
                        <Divider />
                        <Grid.Row className="total">
                            <Grid.Column>
                                <Header as="h3">Total</Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Header>{`R${total}`}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column>
                                <Button disabled={!readyToProcessDelivery({total, delivery: state.cart.delivery, toggleDelivery: deliveryObj.delivery})} fluid icon labelPosition="right" color="black">
                                    Process Checkout {`> ${!readyToProcessDelivery({total, delivery: state.cart.delivery, toggleDelivery: deliveryObj.delivery})}`}
                                    <Icon name="right arrow"/>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        {/* <Divider />
                        <Grid.Row className="addons">
                            <Grid.Column>
                                Some text...
                            </Grid.Column>
                        </Grid.Row> */}
                        <Divider hidden />
                    </Grid>
                </React.Fragment>    
            )
        }}
    </ContextAPI.Consumer>
)

const EmptyCart = () => (
    <Message >
        {/* <Icon name="world"/> */}
        <Message.Content>
            <Message.Header>Empty Cart</Message.Header>
            Go to <Link href="/menu" ><a>menu page</a></Link> and add items
        </Message.Content>
    </Message>
)

class Cart extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            delivery: false
        }
    }

    toggleDelivery = (dispatch) => {
        if (this.state.delivery){
            dispatch({type: "CART_DELIVERY", payload: {}})
            this.setState({delivery: false})
        }
        else
            this.setState({delivery: true})
    }

    componentDidMount(){
        this.setState({loading: false})

        this.props.dispatch({type: "SIDEBAR", payload: false})
        this.props.dispatch({type: "PAGE", payload: "cart"})
    }

    render(){
        const {loading, delivery} = this.state

        return (
            <Layout>
                <ContextAPI.Consumer>
                    {({state}) => {
                        const {cart} = state

                        return(
                            <>
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
                                                <OrderSummary deliveryObj={{delivery, toggleDelivery: this.toggleDelivery}} />
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