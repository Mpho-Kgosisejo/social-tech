import { Tab, Header, Icon, Divider, Message, Dropdown, Container } from "semantic-ui-react"

import {PlaceholderMediumParagraph} from "../components/utils/Placeholders"
import Layout from "../components/Layouts/Layout"
import AboutOurChefs from "../components/Layouts/Features/About/AboutOurChefs"
import AboutOurStory from "../components/Layouts/Features/About/AboutOurStory"
import AboutContactUs from "../components/Layouts/Features/About/AboutContactUs"
import AboutFAQs from "../components/Layouts/Features/About/AboutFAQ"
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { isEmptyObj } from "../src/utils/Objs"
import { RouterHandler } from "../components/Layouts/Features/About/Helper";
import PageHeader from "../components/utils/PageHeader"

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panes: [
                {
                    menuItem: 'Our Story', render: () => <Tab.Pane className="zero-border">
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

    getData = async ({index}) => {
        const data = await api.web.about()

        if (data.status === 200) {
            this.props.dispatch({ type: "ABOUT", payload: {index, ...data.data} })
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        const { tab } = this.props.router.query
        this.props.dispatch({type: "SIDEBAR", payload: false})
        this.props.dispatch({type: "PAGE", payload: "about"})
        
        if (tab) {
            switch (tab) {
                case "ourstory":
                    this.getData({index: 0})
                    break;
                case "ourchefs":
                    this.getData({index: 1})
                    break;
                case "ourcontacts":
                    this.getData({index: 2})
                    break;
                case "ourfaqs":
                    this.getData({index: 3})
                    break;
            }
        }
    }

    changeTab = (stateAbout, index) => {
        this.setState({ index })
        this.props.dispatch({type: "ABOUT", payload: {...stateAbout, index}})
        RouterHandler({index})
    }

    test = (stateAbout, index) => {
        console.log(">>", index)
    }

    render() {
        const { panes, loading } = this.state

        return (
            <Layout title="About Us" includeContainer={false}>
                <PageHeader 
                    color="rgb(212, 195, 176)"
                    title="Welcome to Fresh Chew" />
                
                <Container>
                    <ContextAPI.Consumer>
                        {({state}) => (
                            <React.Fragment>

                                <Divider hidden />

                                {loading ?
                                    <PlaceholderMediumParagraph />
                                    :
                                    <div className="about-content">
                                        <Dropdown
                                            fluid
                                            selection
                                            defaultValue={state.about.index}
                                            onChange={(e, {value}) => this.changeTab(state.about, value)}
                                            options={[
                                                {
                                                    text: "Our Story",
                                                    value: 0
                                                },
                                                {
                                                    text: "Our Chefs",
                                                    value: 1
                                                },
                                                {
                                                    text: "Contact Us",
                                                    value: 2
                                                },
                                                {
                                                    text: "FAQs",
                                                    value: 3
                                                }
                                            ]}
                                        />
                                        <Tab className="about-tab" menu={{ secondary: true, pointing: true }} activeIndex={state.about.index} onTabChange={(e, d) => this.changeTab(state.about, d.activeIndex)} panes={panes} />
                                    </div>
                                }
                            </React.Fragment>
                        )}
                    </ContextAPI.Consumer>
                </Container>
            </Layout>
        )
    }
}

export default About
