import Layout from "../components/Layouts/Layout"
import { Grid, Segment, Header, Icon, Divider } from "semantic-ui-react";

import "../static/css/cart.css"

class Cart extends React.Component {
    render(){
        return (
            <Layout>
                <Header as="h3" color="grey">
                    <Icon name="cart"/>
                    My Cart (5)
                </Header>

                <Divider />

                <Grid className="cart">
                    <Grid.Row>
                        <Grid.Column computer={10} tablet={10} mobile={16}>
                            <Segment>
                                Products    
                            </Segment>    
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={16}>
                            <Segment>
                                Prices
                            </Segment>
                        </Grid.Column>
                            
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default Cart