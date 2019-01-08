import { Grid, Header, Icon, Divider, Button, Checkbox, Label } from "semantic-ui-react";
import StripeCheckout from "react-stripe-checkout"
import Config from "react-global-configuration"

import GoogleMaps from "../../../utils/GoogleMaps"
import { readyToProcessDelivery } from "../../../../src/providers/CartHandler";
import ContextAPI from "../../../../src/config/ContextAPI";
import OrderCollectorForm from "./OrderCollectorForm";

const OrderSummary = ({handleOnProceedPayment, handleCheckout, deliveryObj, useSavedAddress, paymentLoading, funcs, cartState}) => (
    <ContextAPI.Consumer>
        {({state}) => {
            const {subTotal, total, totalItemsCount, tax} = state.cart.details
            const {distance, cost} = state.cart.delivery
            const {login, root_loading, account} = state

            return (
                <React.Fragment>
                    <Grid columns="equal">
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3">Sub. total ({totalItemsCount}):</Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Header>{`R${subTotal.toFixed(2)}`}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h3">TAX:</Header>
                            </Grid.Column>
                            <Grid.Column textAlign="right">
                                <Header>R{!subTotal? "0.0" : `${tax.toFixed(2)}`}</Header>
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
                                            {/* {useSavedAddress ? 
                                                <GoogleMaps
                                                    initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                    destination={state.account.personal_details.address}
                                                /> :
                                                <GoogleMaps
                                                    initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                    destination={null}
                                                />
                                            } */}
                                            <GoogleMaps
                                                initialAddress={"84 Albertina Sisulu Rd, Johannesburg, 2000, South Africa"}
                                                destination={useSavedAddress ? account.personal_details.address : ""}
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
                                            <Header>{`R${cost ? cost.toFixed(2) : "0.0"}`}</Header>
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
                                <Header>{`R${total.toFixed(2)}`}</Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        {root_loading ? null : Object.keys(login).length > 0 &&
                            <>
                                <Grid.Row>
                                    <Grid.Column>
                                        <OrderCollectorForm cartState={cartState} funcs={funcs} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Divider />
                            </>
                        }
                        <Grid.Row>
                            <Grid.Column>
                                {/* <Button
                                    onClick={handleOnProceedPayment}
                                    disabled={!readyToProcessDelivery({total, delivery: state.cart.delivery, toggleDelivery: deliveryObj.delivery})}
                                    fluid
                                    icon
                                    labelPosition="right"
                                    color="black"
                                >
                                    Proceed to Payment
                                    <Icon name="right chevron"/>
                                </Button> */}

                                {root_loading ? null : Object.keys(login).length > 0 ?
                                    !readyToProcessDelivery({total, delivery: state.cart.delivery, toggleDelivery: deliveryObj.delivery}) ?
                                            <Button disabled fluid color="black">Proceed to Payment</Button>
                                        :
                                            <StripeCheckout 
                                                name="Fresh Eats."
                                                description={`Order ${Object.keys(state.cart.delivery).length > 0 ? "with" : "without"} delivery`}
                                                amount={parseInt(total.toFixed(2).replace(".", ""))}
                                                currency="ZAR"
                                                stripeKey={Config.get("stripe.stripeKey")}
                                                shippingAddress={false}
                                                billingAddress={false}
                                                zipCode={false}
                                                token={(data) => handleCheckout({data, cart: state.cart})}
                                                reconfigureOnUpdate={false}
                                                triggerEvent="onClick"
                                                email={login.email}
                                                disabled={(paymentLoading || Object.keys(funcs.isUserValid()).length > 0)}
                                                opened={() => funcs.cartDispatch({paymentLoading: false})}
                                                closed={() => funcs.cartDispatch({paymentLoading: false})}
                                            >
                                                <Button
                                                    disabled={(paymentLoading || Object.keys(funcs.isUserValid()).length > 0)}
                                                    onClick={() => funcs.validatorUser()}
                                                    fluid
                                                    color="black"
                                                >
                                                    {paymentLoading ? `Loading ${Config.get("stripe.name")}...` : "Proceed to Payment"}
                                                </Button>
                                            </StripeCheckout>
                                : 
                                    <Label size="large" style={{width: "100%"}}><Header as="h3" className="notifier">You must login to Proceed to Payment</Header></Label>
                                }
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