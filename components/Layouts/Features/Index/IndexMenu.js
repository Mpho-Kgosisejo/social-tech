import Layout from "../../Layout"
import { List, Image, Grid, Header } from "semantic-ui-react";
import React from 'react'

class IndexMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-menu">
                    <div className="index-menu-container">
                        <div className="index-menu-row">
                            <Grid columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        <List>
                                            <List.Item>
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_1.jpg' />
                                                <List.Content>
                                                    <Header as="h4">FRIED POTATOES WITH GARLIC</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                <Image  size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                                <List.Content>
                                                <   Header as="h4">SALTED FRIED CHICKEN</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                            <Image  size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                            <List.Content>
                                            <Header as="h4">ROAST BEEF (4 STICKS)</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                            <List.Item>
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                                            <List.Content>
                                                <Header as="h4">TUNA ROAST SOURCE</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <List>
                                            <List.Item>
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_5.jpg' />
                                                <List.Content>
                                                    <Header as="h4">BAKED POTATO PIZZA</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                                                <List.Content>
                                                    <Header as="h4">SALTED FRIED CHICKEN</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                            </List.Item>
                                            <List.Item>
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                            <List.Content>
                                                <Header as="h4">TUNA ROAST SOURCE</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                            <List.Item>
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                            <List.Content>
                                                <Header as="h4">FRIED POTATOES WITH GARLIC</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexMenu