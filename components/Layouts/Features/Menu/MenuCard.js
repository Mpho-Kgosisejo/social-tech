import React from 'react'
import { Image, Card, Label, Modal, Header, Divider, Button, Icon, Form, Input } from "semantic-ui-react"

import { MILKY_RED } from "../../../../src/Types/ColorsTypes"
import "../../../../static/css/menu.css";

class menu_card extends React.Component {

    constructor() {
        super()
        this.state = {
            image: "",
            available: false,
            price: 0.0,
            description: "",
            _id: "",
            ingredients: [],
            value: 1
        }
    }
    doDecrement = () => {
        if (this.state.value > 1) {
            this.setState({
                value: this.state.value - 1,
            })
        }
    }

    doIncrement = () => {
        this.setState({
            value: this.state.value + 1,
        });
    }

    render() {
        const { image, available, name, price, description, _id, ingredients } = this.props
        return (
            <Modal key={_id} size='small' trigger={<Card className="zero-border">
                <div className="zero-border menuCardImage" style={{ background: `url(${image})` }}>
                </div>
                <Card.Content className="menuCard zero-border">
                    {available ? null :
                        <Label className="availabilityLabel" style={{ background: MILKY_RED }} horizontal>

                            Unavailable
                </Label>
                    }
                    <Card.Header>{name}</Card.Header>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>


            </Card>
            } closeIcon>
                <Modal.Content image className="menu-modal-content">
                    <Image className="menu-img" size='large' src={image} />
                    <Modal.Description>
                        <Header className="header-name">{name}</Header>
                        <Divider />
                        <p className='food-price'>R{price}</p>
                        <Header className="header-sub-head">How It Is Prepared</Header>
                        <p>{description}</p>
                        <Header className="header-sub-head">The Ingredients</Header>
                        {ingredients.map(item => {
                            return (
                                <Label key={item._id} className="ingredient-styling">
                                    {item}
                                </Label>
                            )
                        })}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <div className="quantity-div">
                        <Button size="mini" circular icon='minus' className="decrease-button dec-inc"
                            onClick={() => { this.doDecrement() }} />
                        <Input className="quantity-input" value={this.state.value} disabled />
                        <Button size="mini" circular icon='add' className="increase-button dec-inc" onClick={() => { this.doIncrement() }} />
                    </div>
                    <Button className="add-button" size="tiny">
                        <Icon name='shop' /> Add to cart
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default menu_card