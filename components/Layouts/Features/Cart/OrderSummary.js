import { Grid, Header, Icon, Divider, Button, Checkbox } from "semantic-ui-react";

import GoogleMaps from "../../../utils/GoogleMaps"
import { readyToProcessDelivery } from "../../../../src/providers/CartHandler";
import ContextAPI from "../../../../src/config/ContextAPI";

const OrderSummary = ({deliveryObj, useSavedAddress}) => (
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
                                <Checkbox toggle disabled={(total <= 0)} onChange={() => deliveryObj.toggleDelivery({state})} />
                            </Grid.Column>
                        </Grid.Row>
                        {(deliveryObj.delivery && useSavedAddress !== null) && (
                                <>
                                    <Grid.Row className="total">
                                        <Grid.Column>
                                        <div className="map-container">
                                            {useSavedAddress ? 
                                                <GoogleMaps
                                                    initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                    destination={state.account.personal_details.address}
                                                /> :
                                                <GoogleMaps
                                                    initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                    destination={null}
                                                />
                                            }
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

export default OrderSummary