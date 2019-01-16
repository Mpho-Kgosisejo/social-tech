import Layout from "../../Layout"
import { List, Image, Grid, Header } from "semantic-ui-react";
import React from 'react'
import IndexBannerHeader from "./IndexBannerHeader";
import ContextAPI from "../../../../src/config/ContextAPI";

class IndexMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <ContextAPI.Consumer>
                {({ state }) => (
                    <React.Fragment>
                        <IndexBannerHeader desc={state.index.menu_banner_desc} header={state.index.menu_banner_header} image={state.index.menu_banner_img} />
                        <div className="index-menu">
                            <div className="index-menu-container">
                                <div className="index-menu-row">
                                    {state.root_loading ? "" : <Grid columns={2} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <List className="align-iterms-center">
                                                    {state.index.menu_items.items.map(item =>
                                                        <React.Fragment key={item.name}>
                                                            <List.Item className="list-padding">
                                                                <Image size="tiny" avatar src={item.image} />
                                                                <List.Content className="menu-content">
                                                                    <Header as="h4">{item.name}</Header>
                                                                    {item.contains}
                                                            </List.Content>
                                                            </List.Item>
                                                        </React.Fragment>
                                                    )}
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <List className="align-iterms-center">
                                                    {state.index.menu_items.items.map(item =>
                                                        <React.Fragment key={item.name}>
                                                            <List.Item className="list-padding">
                                                                <Image size="tiny" avatar src={item.image} />
                                                                <List.Content className="menu-content">
                                                                    <Header as="h4">{item.name}</Header>
                                                                    {item.contains}
                                                            </List.Content>
                                                            </List.Item>
                                                        </React.Fragment>
                                                    )}
                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </ContextAPI.Consumer>
        )
    }
}

export default IndexMenu