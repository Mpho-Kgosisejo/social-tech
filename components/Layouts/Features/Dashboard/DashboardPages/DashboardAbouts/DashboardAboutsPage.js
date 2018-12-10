import React from 'react'
import { Container, Form, TextArea, Button, Tab, Input, Rating, Header } from 'semantic-ui-react'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"
import AboutStory from '../DashboardAbouts/components/abouts_ourstory'
import AboutContact from '../DashboardAbouts/components/abouts_contactus'
import AboutFaq from '../DashboardAbouts/components/abouts_faq'
import AboutsChef from '../DashboardAbouts/components/our_chef';

class DashboardAboutsPage extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      panes: [
        {
          menuItem: 'Our Story Form', render: () => <Tab.Pane>
            <AboutStory/>
          </Tab.Pane>
        
      },
      {
      menuItem: 'Our Chefs Form', render:() => <Tab.Pane>
        <AboutsChef/>
      </Tab.Pane>
      },
      {
        menuItem: 'Contact Us Form', render:() => <Tab.Pane>
          <AboutContact/>
        </Tab.Pane>
        },
        {
          menuItem: 'Our FAQs Form', render:() => <Tab.Pane>
            <AboutFaq/>
          </Tab.Pane>
          }

      ]
    }
    
    

  }
  render() {
    const { panes} = this.state
    
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    )
  }

}
export default DashboardAboutsPage