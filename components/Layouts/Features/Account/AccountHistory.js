import React from 'react'
import { Statistic, Divider, List, Image, Header, Modal, Button, Flag } from 'semantic-ui-react'

import ContextAPI from "../../../../src/config/ContextAPI"

class AccountHistory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render() {
        const { isLoading } = this.state
        return (
            <ContextAPI.Consumer>
                {({ state }) =>
                    <React.Fragment>
                        {/* <pre>{JSON.stringify(state.account, "", 1)}</pre> */}
                        <Statistic horizontal>
                            <Statistic.Value>{state.account.order_history.ordered_number}</Statistic.Value>
                            <Statistic.Label>Orders completed</Statistic.Label>
                        </Statistic>
                        <Divider />
                        {isLoading ? "Lol" : <List divided verticalAlign='middle'>
                            {state.account.order_history.items_ordered.map(item => (
                                <List.Item key={item._id}>
                                    <List.Content floated='right'>
                                        <Modal trigger={<Button>Show More</Button>}>
                                            <Modal.Header>{item.category}</Modal.Header>
                                            
                                            {isLoading ? "Lol" : <React.Fragment>
                                                {state.account.order_history.items_ordered.map(itemm => (
                                                    <Modal.Content image key={itemm._id}>
                                                        <Image wrapped size='medium' src={itemm.image} />
                                                        <Modal.Description>
                                                            <Header>{itemm.name}</Header>
                                                            <p>{itemm.description}</p>
                                                        </Modal.Description>
                                                    </Modal.Content>
                                                ))}
                                             </React.Fragment>
                                            }
                                        </Modal>
                                    </List.Content>
                                    <List.Content>
                                        <Header as="h4">{item.date}</Header>
                                        {item.recipe}
                               </List.Content>
                                </List.Item>
                            ))}
                        </List>
                        }

                    </React.Fragment>
                }
            </ContextAPI.Consumer>
        )
    }
}

export default AccountHistory