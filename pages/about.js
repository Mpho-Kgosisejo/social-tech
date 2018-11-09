import Layout from "../components/Layouts/Layout"
import { Tab, Header, Icon, Divider } from "semantic-ui-react"
import Router from 'next/router'

import AboutOurChefs from "../components/Layouts/Features/About/AboutOurChefs"
import AboutOurStory from "../components/Layouts/Features/About/AboutOurStory"
import AboutContactUs from "../components/Layouts/Features/About/AboutContactUs"
import AboutFAQs from "../components/Layouts/Features/About/AboutFAQ"

const panes = [
    { menuItem: 'Our Story', render: () => <Tab.Pane className="zero-border"> <AboutOurStory /> </Tab.Pane> },
    { menuItem: 'Our Chefs', render: () => <Tab.Pane > <AboutOurChefs /></Tab.Pane> },
    { menuItem: 'Contact Us', render: () => <Tab.Pane> <AboutContactUs /> </Tab.Pane> },
    { menuItem: 'FAQs', render: () => <Tab.Pane> <AboutFAQs /> </Tab.Pane> },
]

class About extends React.Component {
    constructor(props)
    {

        super(props);
    }
    render() {
        return (

            <Layout title="About Us">
                <p></p>
                <div className="aboutsPageWelcomeMessage">
                    <Header as='h1' icon textAlign='center'>
                        <Icon name='food' circular />
                        <Header.Content>Welcome to Fr
                            esh Eats</Header.Content>
                    </Header>
                </div>
                <Divider hidden />
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Layout>
        )
    }
}

export default About