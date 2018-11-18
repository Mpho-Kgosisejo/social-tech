import Layout from "../../Layout"
import { Header, Divider, Grid } from "semantic-ui-react";
import React from 'react'

class IndexHeader extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="header-main-div">
                    <div className="header-container">
                        <div className="header-row align-iterms-center">
                            <p className="header-sub">Hello Dear</p>
                            <Header as="h2">Welcome to Fresh Eats</Header>
                            <Divider className="header-divider" />
                            <Grid>
                                <Grid.Column width={3}>
                                   <p></p>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <p className="header-desc">Fresh Eats was the first retaurant to open in Egypt, the resturant was designed with the history in mind we have created a soft industrial dining room, combined with an open kitchen, coffee take out bar and on site coffee roastery.</p>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                <p></p>
                                </Grid.Column>
                            </Grid>
                            <div className="header-signature">
                                <img className="signImg" src="https://thumb.ibb.co/hsAcfL/Fresh-Eats-Sign.png" alt="Fresh-Eats-Sign" />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexHeader