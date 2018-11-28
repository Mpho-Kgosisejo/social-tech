import React from 'react'
import { Statistic, Divider, List, Image, Header, Modal, Button } from 'semantic-ui-react'

class AccountHistory extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Statistic horizontal>
                    <Statistic.Value>4</Statistic.Value>
                    <Statistic.Label>Orders completed</Statistic.Label>
                </Statistic>
                <Divider />
                <List divided verticalAlign='middle'>
                    <List.Item>
                        <List.Content floated='right'>
                            <Modal trigger={<Button>Show More</Button>}>
                                <Modal.Header>Details</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src='https://demos.onepagelove.com/html/resto/img/img_square_1.jpg' />
                                    <Modal.Description className="modal-desc">
                                        <Header>FRIED POTATOES WITH GARLIC</Header>
                                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                                        <p>Is it okay to use this photo?</p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </List.Content>
                        <Image avatar size="tiny" src='https://demos.onepagelove.com/html/resto/img/img_square_1.jpg' />
                        <List.Content>
                            <Header as="h4">FRIED POTATOES WITH GARLIC</Header>
                            Potatoes / Rice / Garlic
                            </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='right'>
                            <Modal trigger={<Button>Show More</Button>}>
                                <Modal.Header>Details</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                    <Modal.Description className="modal-desc">
                                        <Header>SALTED FRIED CHICKEN</Header>
                                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                                        <p>Is it okay to use this photo?</p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </List.Content>
                        <Image avatar size="tiny" src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                        <List.Content>
                            <Header as="h4">SALTED FRIED CHICKEN</Header>
                            Chicken / Rice / Stew
                            </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='right'>
                            <Modal trigger={<Button>Show More</Button>}>
                                <Modal.Header>Details</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                    <Modal.Description className="modal-desc">
                                        <Header>ROAST BEEF (4 STICKS)</Header>
                                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                                        <p>Is it okay to use this photo?</p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </List.Content>
                        <Image avatar size="tiny" src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                        <List.Content>
                            <Header as="h4">ROAST BEEF (4 STICKS)</Header>
                            Crab / Potatoes / Rice / Stew
                            </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content floated='right'>
                            <Modal trigger={<Button>Show More</Button>}>
                                <Modal.Header>Details</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='medium' src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                                    <Modal.Description className="modal-desc">
                                        <Header>TUNA ROAST SOURCE</Header>
                                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                                        <p>Is it okay to use this photo?</p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </List.Content>
                        <Image avatar size="tiny" src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                        <List.Content>
                            <Header as="h4">TUNA ROAST SOURCE</Header>
                            Crab / Potatoes / Rice
                            </List.Content>
                    </List.Item>
                </List>
            </React.Fragment>
        )
    }
}

export default AccountHistory