import {Table, Header, Input, Icon, Button, Image} from "semantic-ui-react"

import { MILKY_RED } from "../../../../src/Types/ColorsTypes"
import { remove } from "../../../../src/providers/CartHandler";
import ContextAPI from "../../../../src/config/ContextAPI";

const TableItem = ({price, _id, image, name, description, quantity}) => {
    const handleOnRemove = (state) => {
        const item = {
            item: {
                _id
            }
        }
        remove({state, item})
    }

    return (
        <ContextAPI.Consumer>
            {({state}) => (
                <Table.Body className="items">
                    <Table.Row>
                        <Table.Cell width={2}>
                            <Image src={image} width="125" />
                        </Table.Cell>
                        <Table.Cell width={8}>
                            <Header>
                                <a>{name}</a>
                                <Header.Subheader>
                                    {description}
                                </Header.Subheader>
                            </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center" width={2}>
                            <p>Quantity</p>
                            <Input className="qty" value={quantity}  type="number" min="1" />
                        </Table.Cell>
                        <Table.Cell textAlign="right" width={2}>
                            <Header as="h3" color="grey" className="price">{`R ${price}`}</Header>
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