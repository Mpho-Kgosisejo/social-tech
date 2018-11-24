import React from 'react'
import {Image, Item} from 'semantic-ui-react' 

import Layout from '../../Layout';

const AccountHeader = () => (
    <React.Fragment>
        <div className="account-header">
            <div className="account-header-container">
                <Item.Group>
                    <Item>
                        <Image  src="http://i.pravatar.cc/100" size="small" />
                        <Item.Content>
                            <Item.Header as='a'>Thato Mekwa</Item.Header>
                            <Item.Meta>Student</Item.Meta>
                            <Item.Description>
                                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                            </Item.Description>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                    </Item>

                </Item.Group>
            </div>
        </div>
    </React.Fragment>

)
export default AccountHeader;