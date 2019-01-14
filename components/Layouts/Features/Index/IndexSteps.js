import React from 'react'
import { Header, Grid, Image, Icon, Button } from 'semantic-ui-react';
import IndexBannerHeader from './IndexBannerHeader';
import ContextAPI from "../../../../src/config/ContextAPI"

class IndexSteps extends React.Component {
    
    constructor(props)
    {
        super(props)
    }

    render() {
        return (
            <ContextAPI.Consumer>
                {({state}) => (
            <React.Fragment>
                <IndexBannerHeader desc={state.index.steps_banner_desc} image={state.index.steps_banner_img} header={state.index.steps_banner_header}/>
                
                <div className="index-steps">
                    <div className="index-steps-container">
                        <div className="index-steps-row align-iterms-center">
                            {state.root_loading ? "" : <Grid columns={4} divided className="index-step-grid">
                                    {state.index.steps_banner.steps.map(item => (
                                        <React.Fragment key={item.icon}>
                                        <Grid.Column className="index-step-grid-column veritcal-stack">
                                            <Icon name={item.icon} size="huge" />
                                            <Header className="index-step-column-h3" as="h3">{item.header}</Header>
                                            <p className="index-step-column-desc">{item.desc}</p>
                                        </Grid.Column>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            }
                            <Button href="/menu" className="index-step-get-started-btn" basic color='green'>
                                GET STARTED
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            )}
            </ContextAPI.Consumer>
        )
    }
}
export default IndexSteps