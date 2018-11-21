import Layout from "../../Layout"
import { Header, Image, Grid } from "semantic-ui-react";
import React from 'react'

class IndexMenu extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-menu">
                    <div className="index-menu-container">
                        <div className="index-menu-row">
                            <Grid columns={2} divided>
                                <Grid.Column>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexMenu