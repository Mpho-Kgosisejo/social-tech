import React from 'react'
import { Header, Image, Grid } from 'semantic-ui-react';

class ProfileHeader extends React.Component
{
    render()
    {
        return(
            <React.Fragment>
                <div className="profile-header">
                    <div className="profile-header-container">
                        <div className="profile-header-row">
                            <Grid>
                                <Grid.Column width={4}>
                                    <Image src='http://i.pravatar.cc/100' size='small' circular />
                                </Grid.Column>
                                <Grid.Column className="profile-name-header" width={11}>
                                    <Header className="profile-name" as="h1">Thato Mekwa</Header>
                                    <Header as="h2">Texas USA</Header>
                                    <Header as="h3">tmekwa@student.wethinkcode.co.za</Header>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProfileHeader