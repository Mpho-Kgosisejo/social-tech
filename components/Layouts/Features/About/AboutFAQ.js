
import React from 'react'
import { Container, Divider, Icon, Header, Segment, Accordion, Loader } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from '../../../../src/config/ContextAPI';

class AboutFAQ extends React.Component {
    constructor() {
        super()
        this.state = {
            activeIndex: 0,
            responseMessage: "",
            isLoadingData: true,
            aboutData: {}
        }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    getData = async () => {
        const data = await api.web.about()

        this.setState({ aboutData: data })
        console.log(this.state.aboutData)
        console.log(data.data.chefs)
        if (data.status === 200) {
            this.setState({ responseMessage: data.data.message, isLoadingData: false, aboutData: data.data.faqs })
        } else {
            this.setState({ responseMessage: data.error.message, isLoadingData: false })
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { aboutData, activeIndex } = this.state
        return (
            <React.Fragment>
               
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            {/* <pre>{JSON.stringify(state, "", 2)}</pre> */}
                            <Divider hidden />
                            <Container text>
                                <Segment inverted>
                                    <Divider horizontal inverted>
                                        <Header className="aboutsHeaders" as='h2'>{state.about.data.faqs.page_header}</Header>
                                    </Divider>
                                </Segment>
                                <Divider hidden />
                                {!state.about.data.faqs ? "" : <Accordion fluid styled>
                                    {state.about.data.faqs.faqs.map(item => (
                                        <React.Fragment key={item.index}>
                                            <Accordion.Title active={activeIndex === item.index} index={item.index} onClick={this.handleClick}> <Icon name='dropdown' />
                                                {item.question}
                                            </Accordion.Title>
                                            <Accordion.Content active={activeIndex === item.index}>
                                                <p>
                                                    {item.answer}
                                                </p>
                                            </Accordion.Content>
                                        </React.Fragment>
                                    ))}
                                </Accordion>
                                }
                            </Container>
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>
            </React.Fragment>
        )
    }
}

export default AboutFAQ