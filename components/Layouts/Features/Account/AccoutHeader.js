import React from 'react'
import { Image, Item, Icon, Header, Grid, Dropdown } from 'semantic-ui-react'

import Layout from '../../Layout';

const AccountHeader = () => (
    <React.Fragment>
        <div className="account-header">
            <div className="account-header-container">
                <Grid columns={2}>
                    <Grid.Column width={4} className="account-img-col">
                        <Image className="profile-img" src="http://i.pravatar.cc/100" size="small" circular />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as="h2">Thato Mekwa</Header>
                        <div>
                            <Icon name="map marker alternate" />
                            Las Vegas, USA
                        </div>
                        <br />
                        <div className="padding-thirty">
                            <div className="pull-left">
                                <Icon name="building" />
                                Student
                            </div>
                            <div className="pull-right">
                                <a href="#">
                                    <Icon size="" name="edit outline" />
                                    Edit
                                </a>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
        <div className="about-content">
            <Dropdown
                fluid
                selection
                options={[
                    {
                        text: "Personal information",
                        value: 0
                    },
                    {
                        text: "Order history",
                        value: 1
                    },
                ]}
            />
            {/* <Tab className="about-tab" menu={{ secondary: true, pointing: true }} activeIndex={state.about.index} onTabChange={(e, d) => this.changeTab(state.about, d.activeIndex)} panes={panes} /> */}
        </div>
    </React.Fragment>

)
export default AccountHeader; 