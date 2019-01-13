import React from 'react'
import Router from 'next/router'
import { Image, Card, Label, Modal, Header, Divider, Button, Icon, Form, Input } from "semantic-ui-react"

import { MILKY_RED } from "../../../../src/Types/ColorsTypes"
import ContextAPI from '../../../../src/config/ContextAPI';
import * as cartHandler from "../../../../src/providers/CartHandler"

const ModalComponent = ({handleOnModalClose, image, available, name, price, description, _id, ingredients, inCartItem, open, quantity, doDecrement, doIncrement, addToCart, removeFromCart}) => (
    <ContextAPI.Consumer>
        {({state}) => (
            <Modal
                key={_id}
                size='small'
                closeIcon
                open={open}
                onClose={() => handleOnModalClose(state.menu)}
            >
        
                <Modal.Content image className="menu-modal-content">
                    {/* <Image className="menu-img" size='large' src={image} /> */}
                    <Image className="menu-img">
                        <div className="menu-img" style={{background: `url(${image})`}}></div>
                        {available ? null :
                        <Label className="availabilityLabel" style={{ background: MILKY_RED }} horizontal>
                            Unavailable
                        </Label>
                    }
                    </Image>
                    <Modal.Description>
                        <div className="header-container">
                            <Header className="header-name">{name}</Header>
                        </div>
                        <div className="desc-conatiner">
                            <p className='food-price'>
                                {`R${(quantity * price).toFixed(2)}`}
                                <br/>
                                <span>{`(${quantity}x${price})`}</span>
                            </p>
                            <Header className="header-sub-head">How It Is Prepared</Header>
                            <p>{description}</p>
                            <Header className="header-sub-head">The Ingredients</Header>
                            {ingredients.map(item => {
                                return (
                                    <Label key={item} className="ingredient-styling">
                                        {item}
                                    </Label>
                                )
                            })}
                        </div>
                    </Modal.Description>
                </Modal.Content>
                {available && (
                    <Modal.Actions className="no-border">
                        {!inCartItem && (
                            <div className="quantity-div">
                                <Button size="mini" circular icon='minus' className="decrease-button dec-inc"
                                    onClick={doDecrement} />
                                <Input className="quantity-input" value={quantity} disabled />
                                <Button size="mini" circular icon='add' className="increase-button dec-inc" onClick={doIncrement} />
                            </div>
                        )}
        
                        {inCartItem ?
                            <Button className="add-button" size="tiny" onClick={() => removeFromCart(state)}>
                                <Icon name='shop' />
                                Remove from Cart
                            </Button>
                            :
                            <Button className="add-button" size="tiny" onClick={() => addToCart(state)}>
                                <Icon name='shop' />
                                Add to Cart
                            </Button>
                        }
                    </Modal.Actions>
                )}
            </Modal>
        )}
    </ContextAPI.Consumer>
)

class menu_card extends React.Component {
    constructor() {
        super()

        this.state = {
            modal: {
                open: false
            },
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

    removeFromCart = (state) => {
        const new_item = {
            ...this.props,
            quantity: this.state.value
        }

        this.setState({value: 1})
        cartHandler.remove({state, item: new_item})
    }

    addToCart = (state) => {
        const new_item = {
            ...this.props,
            quantity: this.state.value
        }

        cartHandler.add({state, new_item})
        state.dispatch({type: "ALERT_PORTAL", payload: {
            open: true,
            message: `"${this.props.name}" added to cart`
        }})
        this.closeModal()
    }

    handleOnModalClose = (menu) => {
        const {data, index} = menu

        this.setState({
            modal: {
                ...this.state.modal,
                open: false
            }
        })

        this.routerManager({
            tab: data[index].name
        })
    }

    handleOnCardClick = (menu) => {
        const {data, index} = menu

        this.setState({
            modal: {
                open: true
            }
        })

        this.routerManager({
            tab: data[index].name,
            item: this.props._id
        })
    }

    routerManager = (query) => Router.replace({
        pathname: '/menu',
        query
    })

    componentDidMount(){
        const {item} = Router.query

        if (item && item === this.props._id){
            this.setState({
                modal: {
                    open: true
                }
            })
        }
    }

    render() {
        const { image, available, name, description, _id} = this.props

        return (
            <ContextAPI.Consumer>
                {({state}) => {
                    const inCartItem = cartHandler.isInCart({cart: state.cart.items, item: {_id}})

                    return (
                        <>
                            <Card onClick={() => this.handleOnCardClick(state.menu)} className="zero-border">
                                <div className="menuCardImage-p">
                                    <div className="zero-border menuCardImage" style={{ background: `url(${image})`, filter: `grayscale(${available ? 0 : 100}%)` }} />
                                    {available ? null :
                                        <Label className="availabilityLabel" style={{ background: MILKY_RED }} horizontal>
                                            Unavailable
                                        </Label>
                                    }
                                    {
                                        inCartItem &&
                                        <Label className="availabilityLabel incart" style={{ background: MILKY_RED }} horizontal>
                                            <Icon name="cart" />
                                            In Cart
                                        </Label>
                                    }
                                </div>
                                <Card.Content className="menuCard zero-border">
                                    <Card.Header>{name}</Card.Header>
                                    <Card.Description>{description}</Card.Description>
                                </Card.Content>
                            </Card>

                            <ModalComponent
                                {...this.props}
                                open={this.state.modal.open}
                                quantity={this.state.value}
                                doDecrement={this.doDecrement}
                                doIncrement={this.doIncrement}
                                addToCart={this.addToCart}
                                removeFromCart={this.removeFromCart}
                                inCartItem={inCartItem}
                                handleOnModalClose={this.handleOnModalClose}
                            />
                        </>
                )}}
            </ContextAPI.Consumer>
        )
    }
}
export default menu_card