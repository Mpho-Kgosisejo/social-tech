import React from 'react'
import { Tab, Dropdown, Responsive, Segment } from 'semantic-ui-react'
import ContextAPI from "../../../../../../src/config/ContextAPI";
import { isEmptyObj } from "../../../../../../src/utils/Objs"
import { InLineError } from '../../../../../Messages/InLineMessage'
import * as MessageTypes from "../../../../../../src/Types/ColorsTypes"
import AboutStory from '../DashboardAbouts/components/abouts_ourstory'
import AboutContact from '../DashboardAbouts/components/abouts_contactus'
import AboutFaq from '../DashboardAbouts/components/abouts_faq'
import AboutsChef from '../DashboardAbouts/components/our_chef';
import api from '../../../../../../src/providers/APIRequest';
import { RouterHandler } from '../../../../../../components/Layouts/Features/About/Helper';

class DashboardAboutsPage extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      activeIndex : 0,
      panes: [ 
        { menuItem: 'Our Story Form', value : 0 },
        { menuItem: 'Our Chefs Form', value : 1 },
        { menuItem: 'Contact Us Form', value : 2 },
        { menuItem: 'Our FAQs Form', value : 3 }
      ]
    }
    
  }

  HandleDropDown = (index) => this.setState({activeIndex : index})

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  getActiveSegment = (index) => 
  {
    if (index == 0)
    {
      return (<AboutStory />)
    }
    if (index == 1)
    {
      return (<AboutsChef />)
    }
    if (index == 2)
    {
      return (<AboutContact />)
    }
    if (index == 3)
    {
      return (<AboutFaq />)
    }
  }

  render() {
    const { panes, loading, activeIndex } = this.state

    return (


      <div className="dashboard-page-container">
        <Responsive minWidth={0} maxWidth={769}>
          <Dropdown
            fluid
            selection
            defaultValue={activeIndex}
            onChange={(e, {value}) => this.HandleDropDown(value)}
            options={[{ key: 'Our Story Form', value: 0, text: 'Our Story Form' },
            { key: 'Our Chefs Form', value: 1, text: 'Our Chefs Form' },
            { key: 'Contact Us Form', value: 2, text: 'Contact Us Form' },
            { key: 'Our FAQs Form', value: 3, text: 'Our FAQs Form' }
            ]}
          />
        </Responsive>

        <Responsive minWidth={769} >
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} activeIndex={activeIndex} onTabChange={this.handleTabChange}/>
        </Responsive>

          <Segment>
              {this.getActiveSegment(activeIndex)}
          </Segment>

          {/* +<pre>{JSON.stringify(this.state, " ", 2)}</pre> */}
      </div>

    )
    }
}
export default DashboardAboutsPage