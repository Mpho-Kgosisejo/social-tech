import React from 'react';
import {Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';

import Layout from '../components/Layouts/Layout';

class account extends React.Component{

    render(){
        return(
        <Layout title="Account" includeContainer={false}>

         <Sidebar.Pushable as={Segment}>
    <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
      <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic>
        <Header as='h3'>Application Content</Header>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
        </Layout>

        )
    }

}
export default account