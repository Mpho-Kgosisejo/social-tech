import React from 'react';
import {Header, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';

import Layout from '../components/Layouts/Layout';

class account extends React.Component{

    render(){
        return(
          <Layout>
            <React.Fragment>
                <ProfileLayout />
            </React.Fragment>
          </Layout>

          ) 
    }
}
export default account