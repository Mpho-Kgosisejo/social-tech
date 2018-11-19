import React from 'react'
import {Image, Card, Label, Modal, Header, Divider, Button, Icon, Form, Input} from "semantic-ui-react"

import { MILKY_RED } from "../../../../src/Types/ColorsTypes"

const productSelected = () => {
    console.log("clicked!!")
}

const menu_card = ({ image = "", available = false, name = "", price = 0.0, description = "", _id, ingredients = [] }) => <Modal size='small' trigger={<Card className="zero-border" onClick={() => productSelected()}>
    {/* <Image fluid className="menuCardImage" src={image}/> */}
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
}>
       <Modal.Content image>
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
                // <ul className="ingredient-styling">
                
                //     <li>
                //     {item.ingredient_name}
                //     </li>
                // </ul>
                <Label className="ingredient-styling">
                    {item.ingredient_name}
                </Label>
                )
            })}
        {/* <Button className="add-button" color='green'>
        <Icon name='shop' /> Add to cart
      </Button> */}
        </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
    <div className="quantity-div">
        <Button circular className="decrease-button dec-inc"/>
        <Input className="quantity-input" disabled/>
        <Button circular className="increase-button dec-inc"/>
      </div>
      <Button className="add-button" size="tiny">
        <Icon name='shop' /> Add to cart
      </Button>
    </Modal.Actions>
</Modal>
export default menu_card


















{/* <div class="container">
<a class="button" href="#popup">Open Modal</a>
<div class="popup" id="popup">
    <div class="popup-inner">
        <div class="popup__photo">
            <img src="https://images.unsplash.com/photo-1515224526905-51c7d77c7bb8?ixlib=rb-0.3.5&s=9980646201037d28700d826b1bd096c4&auto=format&fit=crop&w=700&q=80" alt=""></img>
        </div>
        <div class="popup__text">
            <h1>Lorem ipsum dolor sit amet</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex velit, viverra non vulputate vitae, blandit vitae nisl. Nullam fermentum orci et erat viverra bibendum. Aliquam sed varius nibh, vitae mattis purus. Mauris elementum sapien non ullamcorper vulputate. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eget felis sit amet eros viverra pulvinar.</p>
        </div>
        <a class="popup__close" href="#">X</a>
    </div>
</div>
</div>  */}