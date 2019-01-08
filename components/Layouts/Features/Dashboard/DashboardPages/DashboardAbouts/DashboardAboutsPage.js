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
import api from '../../../../../../src/providers/APIRequest';

class DashboardAboutsPage extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      panes: [
        {
          menuItem: 'Our Story Form', render: () => <Tab.Pane>
            <AboutStory />
          </Tab.Pane>

        },
        {
          menuItem: 'Our Chefs Form', render: () => <Tab.Pane>
            <AboutsChef />
          </Tab.Pane>
        },
        {
          menuItem: 'Contact Us Form', render: () => <Tab.Pane>
            <AboutContact />
          </Tab.Pane>
        },
        {
          menuItem: 'Our FAQs Form', render: () => <Tab.Pane>
            <AboutFaq />
          </Tab.Pane>
        }
      ]
    }
  }

  getData = async ({ index }) => {

    const data = await api.web.about()

    if (data.status === 200) {
      this.props.dispatch({ type: "ABOUT", payload: { index, ...data.data } })
      this.setState({ loading: false })
    }
    else {
      this.setState({ loading: false })
    }
  }

  componentDidMount() {

    const { tab } = this.props.router.query

    if (tab) {
      switch (tab) {
        case "ourstory":
          this.getData({ index: 0 })
          break;
        case "ourchefs":
          this.getData({ index: 1 })
          break;
        case "ourcontacts":
          this.getData({ index: 2 })
          break;
        case "ourfaqs":
          this.getData({ index: 3 })
          break;
      }
    }
  }




  render() {
    const { panes } = this.state

    return (
      <div className="dashboard-page-container">
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    )
  }

}
export default DashboardAboutsPage