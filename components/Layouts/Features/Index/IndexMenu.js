import Layout from "../../Layout"
import { List, Image, Grid, Header } from "semantic-ui-react";
import React from 'react'
import IndexBannerHeader from "./IndexBannerHeader";

class IndexMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <IndexBannerHeader desc="Discover the taste" header="Explore our menu" image= "http://themearth.com/demo/html/restaura/view/assets/img/menu/menu1.jpg" />
                <div className="index-menu">
                    <div className="index-menu-container">
                        <div className="index-menu-row">
                            <Grid columns={2} divided>
                                <Grid.Row>
                                    <Grid.Column>
                                        <List className="align-iterms-center">
                                            <List.Item className="list-padding">
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_1.jpg' />
                                                <List.Content className="menu-content">
                                                    <Header as="h4">FRIED POTATOES WITH GARLIC</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                                </List.Item>
                                                <List.Item className="list-padding">
                                                <Image  size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                                <List.Content className="menu-content">
                                                <   Header as="h4">SALTED FRIED CHICKEN</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                            </List.Item>
                                            <List.Item className="list-padding">
                                            <Image  size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                            <List.Content className="menu-content">
                                            <Header as="h4">ROAST BEEF (4 STICKS)</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                            <List.Item className="list-padding">
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                                            <List.Content className="menu-content">
                                                <Header as="h4">TUNA ROAST SOURCE</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <List className="align-iterms-center">
                                            <List.Item className="list-padding">
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_5.jpg' />
                                                <List.Content className="menu-content">
                                                    <Header as="h4">BAKED POTATO PIZZA</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                                </List.Item>
                                                <List.Item className="list-padding">
                                                <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_4.jpg' />
                                                <List.Content className="menu-content">
                                                    <Header as="h4">SALTED FRIED CHICKEN</Header>
                                                    Crab / Potatoes / Rice
                                                </List.Content>
                                            </List.Item>
                                            <List.Item className="list-padding">
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_3.jpg' />
                                            <List.Content className="menu-content">
                                                <Header as="h4">TUNA ROAST SOURCE</Header>
                                                Crab / Potatoes / Rice
                                            </List.Content>
                                            </List.Item>
                                            <List.Item className="list-padding">
                                            <Image size="tiny" avatar src='https://demos.onepagelove.com/html/resto/img/img_square_2.jpg' />
                                            <List.Content className="menu-content">
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