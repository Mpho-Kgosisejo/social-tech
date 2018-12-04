import {Table, Header, Input, Icon, Button, Image} from "semantic-ui-react"

import { MILKY_RED } from "../../../../src/Types/ColorsTypes"
import { remove, update } from "../../../../src/providers/CartHandler";
import ContextAPI from "../../../../src/config/ContextAPI";

const TableItem = ({price, _id, image, name, description, quantity}) => {
    const handleOnRemove = (state) => {
        const item = {
            _id
        }
        remove({state, item})
    }

    const handleQuantityChange = ({state, value}) => {
        value = (!parseInt(value) || parseInt(value) <= 0) ? 1 : parseInt(value)
        const item = {
            _id,
            price,
            image,
            name,
            description,
            quantity: value
        }

        update({state, item})
    }

    return (
        <ContextAPI.Consumer>
            {({state}) => (
                <Table.Body className="items">
                    <Table.Row>
                        <Table.Cell width={2} textAlign="center">
                            <Image src={image} width="125" />
                        </Table.Cell>
                        <Table.Cell width={8} textAlign="center">
                            <Header>
                                <b><a>{name}</a></b>
                                <Header.Subheader>
                                    {description}
                                </Header.Subheader>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center" width={2}>
                            <p>Quantity</p>
                            <Input className="qty" value={quantity}  type="number" min="1" onChange={(e, {value}) => handleQuantityChange({value, state})} />
                        </Table.Cell>
                        <Table.Cell textAlign="center" width={2}>
                            <p>({quantity}xR{price})</p>
                            <Header as="h3" color="grey" className="price">{`R${quantity * price}`}</Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center" width={2}>
                            <Button icon size="mini" style={{backgroundColor: MILKY_RED}} onClick={() => handleOnRemove(state)}>
                                <Icon name="close" color="grey" />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            )}
        </ContextAPI.Consumer>
    )
}

export default TableItem