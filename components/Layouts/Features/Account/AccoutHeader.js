import React from 'react'
import { Image, Item, Icon, Header, Grid, Button } from 'semantic-ui-react'

import ContextAPI from "../../../../src/config/ContextAPI";
import Layout from '../../Layout';
import Avator from '../../../utils/Avator';


const HideButton = () => (
        <>
        </>
)

const DisplayButton = () => (
        <div className="pull-right">
            <Button circular icon='edit outline' />
        </div>
)

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

    componentDidMount()
    {
        console.log(this.props)
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
                                    <ContextAPI.Consumer>
                                    {({state}) => <Avator url={''} size="small" circular />}
                                </ContextAPI.Consumer>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Header as="h2">
                                            {(state.account.personal_details.firstname && state.account.personal_details.lastname) ? 
                                                `${state.account.personal_details.firstname} ${state.account.personal_details.lastname}` :
                                                state.account.personal_details.username
                                            }
                                        </Header>
                                        <br />
                                        <div className="padding-thirty">
                                            <pre>{JSON.stringify(this.state, "", 1)}</pre>
                                            <React.Fragment>
                                                {this.state.disabled ? <DisplayButton /> : <HideButton />}
                                            </React.Fragment>
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