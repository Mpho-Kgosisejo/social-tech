import React from 'react'
import { Divider, Image, Card, Label, Button} from "semantic-ui-react"
import {MILKY_RED} from "../../../../src/Types/ColorsTypes"

const menu_card = ({image = "", available = false, name = "", price = 0.0, description = ""}) => <Card className="zero-border">
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

export default menu_card