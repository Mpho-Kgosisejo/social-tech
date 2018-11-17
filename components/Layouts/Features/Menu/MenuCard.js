import React from 'react'
import { Header, Image, Card, Label, Modal} from "semantic-ui-react"
import {MILKY_RED} from "../../../../src/Types/ColorsTypes"

const productSelected = () => {
    console.log("clicked!!")
}

const menu_card = ({image = "", available = false, name = "", price = 0.0, description = "", _id, ingredients = ""}) => <Modal trigger={<Card className="zero-border" onClick={() => productSelected()}>
    {/* <Image fluid className="menuCardImage" src={image}/> */}
    <div className="zero-border menuCardImage" style={{background: `url(${image})`}}>
    </div>
        <Card.Content className="menuCard zero-border">
            {available ? null : 
                <Label className="availabilityLabel" style={{ background: MILKY_RED  }} horizontal>
                    Unavailable
                </Label>
            }
            <Card.Header>{name}</Card.Header>
            <Card.Description>{description}</Card.Description>
        </Card.Content>
    </Card>
    }>
        <Modal.Content image>
        <Image wrapped size='medium' src={image} />
        <Modal.Description>
            <Header>{name}</Header>
            <p>{description}</p>
            <p>{ingredients}</p>
            <p>{price}</p>
        </Modal.Description>
        </Modal.Content>
    </Modal>

export default menu_card