import Layout from "../../Layout"
import { Header, Divider, Grid } from "semantic-ui-react";
import React from 'react'
import ContextAPI from "../../../../src/config/ContextAPI"
import { PlaceholderMediumParagraph } from "../../../utils/Placeholders"

class IndexHeader extends React.Component {
    
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
                {({state}) => (
            <React.Fragment>
                <div className="header-main-div">
                    <div className="header-container">
                        <div className="header-row align-iterms-center">
                            {state.root_loading ? <PlaceholderMediumParagraph /> : 
                            <React.Fragment>
                            <p className="header-sub">{state.index.header_subtitle}</p>
                            <Header as="h2">{state.index.header_title}</Header>
                            <Divider className="header-divider" />
                            <Grid>
                                <Grid.Column width={3}>
                                   <p></p>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <p className="header-desc">{state.index.header_desc}</p>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                <p></p>
                                </Grid.Column>
                            </Grid>
                            
                            <div className="header-signature">
                                <img className="signImg" src={state.index.header_sign_img} alt="Fresh-Eats-Sign" />
                            </div>
                            </React.Fragment>
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

export default IndexHeader