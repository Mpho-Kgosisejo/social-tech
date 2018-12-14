import React from "react"
import { Button, Icon } from "semantic-ui-react";

import ContextAPI from "../../../../src/config/ContextAPI"

class Payment extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {handleOnProceedPayment} = this.props

        return (
            <ContextAPI.Consumer>
                {({state}) => (
                    <>
                        <pre>{JSON.stringify(state.cart.details, "", 2)}</pre>
                        <pre>{JSON.stringify(state.cart.delivery, "", 2)}</pre>
                        <Button
                            onClick={() => handleOnProceedPayment({proceed: false})}
                            color="black"
                            fluid
                            icon
                            labelPosition="left"
                        >
                            <Icon name="left chevron" />
                            Cancel
                        </Button>
                    </>
                )}
            </ContextAPI.Consumer>
        )
    }
} 

export default Payment