import { Tab, Header, Icon, Divider, Message } from "semantic-ui-react"

import {PlaceholderMediumParagraph} from "../components/utils/Placeholders"
import Layout from "../components/Layouts/Layout"
import AboutOurChefs from "../components/Layouts/Features/About/AboutOurChefs"
import AboutOurStory from "../components/Layouts/Features/About/AboutOurStory"
import AboutContactUs from "../components/Layouts/Features/About/AboutContactUs"
import AboutFAQs from "../components/Layouts/Features/About/AboutFAQ"
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { isEmptyObj } from "../src/utils/Objs"

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            panes: [
                {
                    menuItem: 'Our Storyes', render: () => <Tab.Pane className="zero-border">
                        <ContextAPI.Consumer>
                            {({ state }) => (
                                <React.Fragment>
                                    {/* <pre>{JSON.stringify(state, "", 2)}</pre> */}
                                    {!isEmptyObj(state.about.our_story) ? <AboutOurStory /> : <Message
                                        error
                                        header='There was some errors with your request'
                                        list={[
                                            'You must include both a upper and lower case letters in your password.',
                                            'You need to select your home country.',
                                        ]}
                                    />}
                                </React.Fragment>
                            )
                            }

                        </ContextAPI.Consumer></Tab.Pane>
                }
                ,
                {
                    menuItem: 'Our Chefs', render: () => <Tab.Pane className="zero-border">
                        <ContextAPI.Consumer>
                            {({ state }) => (

                                <React.Fragment>
                                    {/* <pre>{JSON.stringify(state, "", 2)}</pre> */}
                                    {!isEmptyObj(state.about.chefs) ? <AboutOurChefs /> : <Message
                                        error
                                        header='There was some errors with your request'
                                        list={[
                                            'You must include both a upper and lower case letters in your password.',
                                            'You need to select your home country.',
                                        ]}
                                    />}
                                </React.Fragment>
                            )
                            }

                        </ContextAPI.Consumer>
                    </Tab.Pane>
                },
                {
                    menuItem: 'Contact Us', render: () => <Tab.Pane className="zero-border">
                        <ContextAPI.Consumer>
                            {({ state }) => (
                                <React.Fragment>
                                    {/* <pre>{JSON.stringify(state, "", 2)}</pre> */}
                                    {!isEmptyObj(state.about.contact_us) ? <AboutContactUs /> : <Message
                                        error
                                        header='There was some errors with your request'
                                        list={[
                                            'You must include both a upper and lower case letters in your password.',
                                            'You need to select your home country.',
                                        ]}
                                    />}
                                </React.Fragment>
                                )
                            }
                        </ContextAPI.Consumer>
                    </Tab.Pane>
                },
                {
                    menuItem: 'FAQs', render: () => <Tab.Pane className="zero-border">
                        <ContextAPI.Consumer>
                            {({ state }) => (
                                <React.Fragment>
                                    {/* <pre>{JSON.stringify(state, "", 2)}</pre> */}
                                    {!isEmptyObj(state.about.faqs) ? <AboutFAQs /> : <Message
                                        error
                                        header='There was some errors with your request'
                                        list={[
                                            'You must include both a upper and lower case letters in your password.',
                                            'You need to select your home country.',
                                        ]}
                                    />}
                                </React.Fragment>
                            )
                            }

                        </ContextAPI.Consumer>
                    </Tab.Pane>
                },
            ],
            loading: true
        }
    }

    getData = async () => {
        const data = await api.web.about()

        if (data.status === 200) {
            this.props.dispatch({ type: "ABOUT", payload: {index: this.state.index, ...data.data} })
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        const { tab } = this.props.router.query
        this.props.dispatch({type: "SIDEBAR", payload: false})
        this.getData()

        if (tab) {
            switch (tab) {
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

    changeTab = (stateAbout, index) => {
        this.setState({ index })
        this.props.dispatch({type: "ABOUT", payload: {...stateAbout, index}})
    }

    render() {
        const { panes, loading } = this.state

        return (
            <Layout title="About Us">
                <p></p>
                
                <ContextAPI.Consumer>
                    {({state}) => (
                        <React.Fragment>
                            <div className="aboutsPageWelcomeMessage">
                                <Header as='h1' icon textAlign='center'>
                                    <Icon name='food' circular />
                                    <Header.Content>Welcome to Fresh Eats</Header.Content>
                                </Header>
                            </div>
                            <Divider hidden />
                            {loading ? <PlaceholderMediumParagraph />  : <Tab menu={{ secondary: true, pointing: true }} activeIndex={state.about.index} onTabChange={(e, d) => this.changeTab(state.about, d.activeIndex)} panes={panes} />}
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>
            </Layout>
        )
    }
}

export default About