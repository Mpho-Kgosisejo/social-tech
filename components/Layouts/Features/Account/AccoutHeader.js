import React from 'react'
import { Image, Item, Icon, Header, Grid, Dropdown, Button } from 'semantic-ui-react'

import ContextAPI from "../../../../src/config/ContextAPI";
import Layout from '../../Layout';

class AccountHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: true
        }
    }

    editFunc = () => {
        this.setState({ disabled: false })
    }

    render() {
        return (
            <ContextAPI.Consumer>
                {({ state }) =>
                    <React.Fragment>
                        <div className="account-header">
                            <div className="account-header-container">
                                <Grid columns={2}>
                                    <Grid.Column width={4} className="account-img-col">
                                        <Image className="profile-img" src={state.account.personal_details.img_url} size="small" circular />
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Header as="h2">{state.account.personal_details.first_name} {state.account.personal_details.last_name}</Header>
                                        <br />
                                        <div className="padding-thirty">
                                            <div className="pull-right">
                                                <Button onClick={this.editFunc} circular icon='edit outline' />
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </ContextAPI.Consumer>

        )
    }
}
export default AccountHeader; 