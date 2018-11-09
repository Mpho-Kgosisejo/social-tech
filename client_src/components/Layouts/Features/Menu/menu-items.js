import api from "../../../../src/providers/APIRequest"
import { Loader, Image, Card, Label, Button } from "semantic-ui-react"
import {isEmptyObj} from "../../../../src/utils/Objs"
import React, { Component, Fragment } from 'react'
import {MILKY_GREEN, MILKY_RED} from "../../../../src/Types/ColorsTypes"

class Menu_Items extends React.Component {
    constructor()
    {
        super()
        this.state = {
            responseMessage : "",
            isLoadingData : true,
            menu : {}
        }
    }

    getMenu = async () => {
        const data = await api.menu.menu_items()
        console.log()

        if (data.status === 200){
            this.setState({responseMessage: data.data.message, isLoadingData: false, menu : data.data.menu})
        }else{
            this.setState({responseMessage: data.error.message, isLoadingData: false})
        }
        
    }

    componentDidMount(){
        this.getMenu()
    }

    render () {
        const {isLoadingData, menu} = this.state

        return(
            <div>
                {/* <pre>{JSON.stringify(this.state, "", 2)}</pre> */}

                {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> : <Card.Group doubling itemsPerRow={3} stackable>
                    {menu.map(item => (
                        <Card key={item.name}>
                                <Image src={item.image} />
            
                            <Card.Content className="menuCard">
                                <Label className="availabilityLabel" style={{ background: item.available ? '#FFFFFF' : MILKY_RED  }} horizontal>
                                    {item.available ? "" : "Unavailable"}
                                </Label>
                                <Card.Header>{item.name}</Card.Header>
                                <Card.Meta>R{item.price}</Card.Meta>
                                <Card.Description>{item.description}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            <Button disabled={item.available ? false : true} primary>
                                Order
                            </Button>
              </Card.Content>
                        </Card>
                    ))}
                </Card.Group>}
            </div>
        )}
}

export default Menu_Items   