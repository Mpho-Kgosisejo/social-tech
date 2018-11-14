import Layout from "../components/Layouts/Layout"
import { Tab, Header, Icon, Divider } from "semantic-ui-react"
import Router from 'next/router'

import AboutOurChefs from "../components/Layouts/Features/About/AboutOurChefs"
import AboutOurStory from "../components/Layouts/Features/About/AboutOurStory"
import AboutContactUs from "../components/Layouts/Features/About/AboutContactUs"
import AboutFAQs from "../components/Layouts/Features/About/AboutFAQ"
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            panes: [
                { menuItem: 'Our Story', render: () => <Tab.Pane className="zero-border"> <AboutOurStory /> </Tab.Pane> },
                { menuItem: 'Our Chefs', render: () => <Tab.Pane className="zero-border"> <AboutOurChefs /></Tab.Pane> },
                { menuItem: 'Contact Us', render: () => <Tab.Pane className="zero-border"> <AboutContactUs /> </Tab.Pane> },
                { menuItem: 'FAQs', render: () => <Tab.Pane className="zero-border"> <AboutFAQs /> </Tab.Pane> },
            ],
            loading: true
        }
    }

    getData = async () => {
        const data = await api.web.about()

        console.log("res", data)
        if (data.status === 200) {
            console.log("Done")
            this.props.dispatch({ type: "ABOUT", payload: data })
            this.setState({ loading: false })
        } else {
            console.log("Error")
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        const { index } = this.props.router.query
        this.getData()

        if (index) {
            switch (index) {
                case "ourstory":
                    this.setState({ index: 0 })
                    break;
                case "ourchefs":
                    this.setState({ index: 1 })
                    break;
                case "ourcontacts":
                    this.setState({ index: 2 })
                    break;
                case "ourfaqs":
                    this.setState({ index: 3 })
                    break;
            }
        }
    }

    changeTab = (index) => {
        this.setState({ index })
    }

    render() {
        const { index, panes, loading } = this.state

        return (
            <Layout title="About Us">
                <p></p>
                <div className="aboutsPageWelcomeMessage">
                    <Header as='h1' icon textAlign='center'>
                        <Icon name='food' circular />
                        <Header.Content>Welcome to Fresh Eats</Header.Content>
                    </Header>
                </div>
                <Divider hidden />
                {loading ? "laoding" : <Tab menu={{ secondary: true, pointing: true }} activeIndex={index} onTabChange={(e, d) => this.changeTab(d.activeIndex)} panes={panes} />}
            </Layout>
        )
    }
}

export default About