import Layout from "../components/Layouts/Layout"
import { Grid, Segment, Header, Icon, Divider, Table, Image, Label, Input } from "semantic-ui-react";

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
                        <Grid.Column computer={10} tablet={16} mobile={16}>
                            <Segment>
                                <Table basic="very" celled >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>Image</Table.HeaderCell>
                                            <Table.HeaderCell>Qty</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as="h3" image>
                                                    <Image src="https://react.semantic-ui.com/images/avatar/small/lena.png" />
                                                    <Header.Content>
                                                        Header
                                                        <Header.Subheader><a>View Item</a></Header.Subheader>
                                                    </Header.Content>
                                                </Header>
                                                <Divider/>
                                                {"Cras vulputate eget odio egestas rutrum. Aliquam molestie felis quis nulla eleifend, quis sollicitudin lorem varius. Etiam odio ex, pulvinar a ullamcorper non, ullamcorper malesuada elit. Mauris a leo tortor. Nunc elementum commodo metus, a posuere mauris porta sit amet."}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input className="qty" value="0"  type="number" min="1" />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Label.Group circular>
                                                    <Label className="price">{`R${9.99}`}</Label>
                                                </Label.Group>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Segment>    
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={16} mobile={16}>
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