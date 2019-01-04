import React from "react"
import { Form, Header } from "semantic-ui-react";
import { InLineError } from "../../../Messages/InLineMessage";
import { LIGHT_RED } from "../../../../src/Types/ColorsTypes";

const OrderCollectorForm = ({cartState, funcs}) => {
    const {user, userErrors} = cartState
    const {firstname, lastname, phonenumber} = user

    const onChange = (e) => {
        const user = {
            ...cartState.user,
            [e.target.name]: e.target.value
        }

        funcs.cartDispatch({
            user,
            userErrors: funcs.isUserValid(user)
        })
    }

    return (
        <Form onSubmit={() => {}} loading={false}>
            <Header className="zero-margin-top">
                Collector<span>'s details:</span>
                {/* <br />
                <b>
                    <span className="error" style={{color: LIGHT_RED, fontSize: ".75em"}}>
                        {Object.values(userErrors).map((error, i) => (
                            <div key={i}>{error}</div>
                        ))}
                    </span>
                </b> */}
            </Header>
            <Form.Group widths="equal">
                <Form.Input
                    fluid
                    placeholder={userErrors.firstname ? userErrors.firstname : "Phone number"}
                    name="firstname"
                    value={firstname}
                    onChange={onChange}
                    error={userErrors.firstname !== undefined}
                />
                <Form.Input
                    fluid
                    placeholder={userErrors.lastname ? userErrors.lastname : "Phone number"}
                    name="lastname"
                    value={lastname}
                    onChange={onChange}
                    error={userErrors.lastname !== undefined}
                />
            </Form.Group>
            <Form.Input
                fluid
                placeholder={userErrors.phonenumber ? userErrors.phonenumber : "Phone number"}
                name="phonenumber"
                value={phonenumber}
                onChange={onChange}
                error={userErrors.phonenumber !== undefined}
            />
        </Form>
    )
}

export default OrderCollectorForm