import React from 'react'
import {Image, Item, Icon, Header, Grid, Divider} from 'semantic-ui-react' 

import Layout from '../../Layout';

const AccountHeader = () => (
    <React.Fragment>
        <div className="account-header">
            <div className="account-header-container">
                <Grid columns={2}>
                    <Grid.Column width={4}>
                        <Image src="http://i.pravatar.cc/100" size="small" circular/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as="h2">Thato Mekwa</Header>
                        <Icon name="map marker alternate" />
                        Las Vegas, USA
                        <br />
                        <br />
                        <Icon name="building"/>
                        Student
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    </React.Fragment>

)
export default AccountHeader; 