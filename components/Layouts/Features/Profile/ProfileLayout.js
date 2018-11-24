import React from 'react'

import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTabs';

class ProfileLayout extends React.Component
{
    render()
    {
        return(
            <React.Fragment>
                <ProfileHeader />
                <ProfileTabs />
            </React.Fragment>
            
        )
    }
}

export default ProfileLayout;