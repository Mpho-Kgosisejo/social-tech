import React from 'react'
import { Grid, GridColumn, Header, Divider, Button } from 'semantic-ui-react';

class IndexNewDish extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="index-banner">
                    <div className="index-banner-container">
                        <Grid columns="equal">
                            <Grid.Row className="index-banner-row">
                                <GridColumn className="col1">
                                    <div className="index-banner-content align-iterms-center">
                                        <p className="index-banner-content-subtitle">New dishes</p>
                                        <Header className="index-banner-content-title" as="h2">Grilled Seafood Paella</Header>
                                        <Divider />
                                        <p className="index-banner-content-desc">Monkfish, onion, paella rice, garlic & smoked paprika, creamy chesapeake crab dip with artichoke, baked and topped with cheddar cheese, with crusty bread for dipping.</p>
                                    </div>
                                    <div className="index-banner-btn  align-iterms-center">
                                        <Button className="btn-color-dfm" basic>
                                            DISCOVER FULL MENU
                                        </Button>
                                    </div>
                                </GridColumn>
                                <Grid.Column className="col2">
                                    <div className="index-banner-img-div">
                                        <img className="index-banner-img" src="https://thumb.ibb.co/gJhHFL/salmon.jpg" alt="salmon" border="0" />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default IndexNewDish;