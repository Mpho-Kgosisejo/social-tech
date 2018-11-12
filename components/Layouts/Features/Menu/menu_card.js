import React from 'react'
import { Divider, Image, Card, Label, Button} from "semantic-ui-react"
import {MILKY_RED} from "../../../../src/Types/ColorsTypes"

const menu_card = ({image = "", available = false, name = "", price = 0.0, description = ""}) => <Card>
    <Image className="menuCardImage" src={image}/>
    <Card.Content className="menuCard">
        {available ? null : 
            <Label className="availabilityLabel" style={{ background: MILKY_RED  }} horizontal>
                Unavailable
            </Label>
        }
        <Card.Header>{name}</Card.Header>
        <Card.Meta>R{price}</Card.Meta>
        <Card.Description>{description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button floated="right" disabled={!available} size="small" primary>
            Order
        </Button>
    </Card.Content>
</Card>

export default menu_card