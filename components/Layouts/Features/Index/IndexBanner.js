import React from 'react'
import { Grid, GridColumn, Header, Divider, Button } from 'semantic-ui-react';
import IndexBannerHeader from './IndexBannerHeader';
import ContextAPI from '../../../../src/config/ContextAPI';
import { PlaceHolderMenu } from "../../../utils/Placeholders"

class IndexBanner extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <ContextAPI.Consumer>
                {({state}) => 
                    <React.Fragment>
                        {/* <pre>{JSON.stringify(state.index, "", 1)}</pre> */}
                        <IndexBannerHeader desc={state.index.todays_spe_banner_desc} header={state.index.todays_spe_banner_header} image={state.index.todays_spe_banner_img} />
                        <div className="index-banner">
                            <div className="index-banner-container">
                                {state.root_loading ? <PlaceHolderMenu /> : 
                                <Grid columns="equal">
                                    <Grid.Row className="index-banner-row">
                                        <GridColumn className="col1 padding-zero">
                                            <div className="index-banner-content align-iterms-center">
                                                <p className="index-banner-content-subtitle">{state.index.todays_spe_new_dish}</p>
                                                <Header className="index-banner-content-title" as="h2">{state.index.todays_spe_name}</Header>
                                                <Divider />
                                                <p className="index-banner-content-desc">{state.index.todays_spe_desc}</p>
                                            </div>
                                            <div className="index-banner-btn  align-iterms-center">
                                                <Button href="/menu" className="btn-color-dfm" basic>
                                                    DISCOVER FULL MENU
                                                </Button>
                                            </div>
                                        </GridColumn>
                                        <Grid.Column className="col2 padding-zero">
                                            <div className="index-banner-img-div">
                                                <img className="index-banner-img" src="https://demos.onepagelove.com/html/resto/img/img_square_4.jpg" alt="salmon" border="0" />
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                }
                            </div>
                        </div>
                    </React.Fragment>    
                }
            </ContextAPI.Consumer>
        )
    }
}

export default IndexBanner;