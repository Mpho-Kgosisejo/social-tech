import { Grid, Segment, Header, Icon, Divider, Table, Image, Input, Button } from "semantic-ui-react";

import Layout from "../components/Layouts/Layout"
import TableItem from "../components/Layouts/Features/Cart/TableItem"
import { CartTablePlaceholder } from "../components/utils/Placeholders";
import ContextAPI from "../src/config/ContextAPI";

const OrderSummary = () => (
    <React.Fragment>
        <Header as="h3">Order Summary</Header>
        <Divider />
        <Grid columns="equal">
            <Grid.Row>
                <Grid.Column>
                    <Header as="h3">Sub. total (5)</Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Header>R24.99</Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h3">TAX</Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Header>R24.99</Header>
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row className="total">
                <Grid.Column>
                    <Header as="h3">Total</Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Header>R24.99</Header>
                </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
                <Grid.Column>
                    <Button fluid icon labelPosition="right" color="black">
                        Process Checkout
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

class Cart extends React.Component {
    constructor(){
        super()

        this.state = {
            loading: true
        }
    }

    componentDidMount(){
        this.setState({loading: false})
    }

    render(){
        const {loading} = this.state

        return (
            <Layout>
                <Divider hidden />
                <Header as="h3" color="grey">
                    <Icon name="cart" size="mini"/>
                    My Cart (5)
                </Header>

                <Divider />

                <ContextAPI.Consumer>
                    {({state}) => (
                        <Grid className="cart">
                            <Grid.Row>
                                <Grid.Column computer={10} tablet={16} mobile={16}>
                                    <Segment>
                                        <Table basic="very" celled >
                                            {loading ?
                                                <>
                                                    <CartTablePlaceholder />
                                                </> :
                                                <>
                                                    {state.cart.length > 0 ? 
                                                        state.cart.map(item => (
                                                            <TableItem key={item.count} quantity={item.quantity} {...item.item} />
                                                        )) :
                                                        "Cart Empty..."
                                                    }
                                                </>
                                            }
                                        </Table>
                                    </Segment>
                                        
                                </Grid.Column>
                                <Grid.Column computer={6} tablet={16} mobile={16}>
                                    <Segment className="order">
                                        <OrderSummary />
                                    </Segment>
                                </Grid.Column>  
                            </Grid.Row>
                        </Grid>
                    )}
                </ContextAPI.Consumer>
            </Layout>
        )
    }
}

export default Cart