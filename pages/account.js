import React from 'react';

import Layout from '../components/Layouts/Layout';
import AccountLayout from '../components/Layouts/Features/Account/AccountLayout';

class account extends React.Component{

    componentDidMount(){
        this.props.dispatch({type: "PAGE", payload: "account"})
    }
    render(){
        return(
          <Layout>
            <React.Fragment>
                {/* <ProfileLayout /> */}
                <AccountLayout />
            </React.Fragment>
          </Layout>

          )
    }
}
export default account