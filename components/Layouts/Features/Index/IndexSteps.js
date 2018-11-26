import React from 'react'
import { Header, Grid, Image, Icon, Button } from 'semantic-ui-react';
import IndexBannerHeader from './IndexBannerHeader';

class IndexSteps extends React.Component {

    render() {
        return (
            <React.Fragment>
                <IndexBannerHeader desc="Here's how you use it" image="https://demos.hogash.com/phaeton-restaurant-html/images/bestservice.jpg" header="Easy to use"/>
                
                <div className="index-steps">
                    <div className="index-steps-container">
                        <div className="index-steps-row align-iterms-center">
                            {/* <p  className="index-step-sub">Join the freshness!!</p>
                            <Header as="h2">Heres how you use it:</Header> */}
                            <Grid columns={4} divided className="index-step-grid">
                                <Grid.Row>
                                    <Grid.Column  className="veritcal-stack">
                                        <div className="index-step-grid-column">
                                            <Icon name="laptop" size="huge" />
                                            <Header className="index-step-column-h3" as="h3">Order</Header>
                                            <p className="index-step-column-desc">Choose your favourite options</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column  className="veritcal-stack">
                                        <div className="index-step-grid-column">
                                            <Icon name="payment" size="huge" />
                                            <Header className="index-step-column-h3" as="h3">Billing</Header>
                                            <p className="index-step-column-desc">Enter billing information</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column  className="veritcal-stack">
                                        <div className="index-step-grid-column">
                                            <Icon name="truck" size="huge" />
                                            <Header className="index-step-column-h3" as="h3">Shipping</Header>
                                            <p className="index-step-column-desc">Food delivery</p>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column className="veritcal-stack">
                                        <div className="index-step-grid-column">
                                            <Icon name="info" size="huge" />
                                            <Header className="index-step-column-h3" as="h3">Confirm</Header>
                                            <p className="index-step-column-desc">'Once delivered confirmation will be sent</p>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Button href="/menu" className="index-step-get-started-btn" basic color='green'>
                                GET STARTED
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default IndexSteps