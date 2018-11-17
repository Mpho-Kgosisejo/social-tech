import { Container, Divider, Header, Segment, Icon, Grid, Placeholder } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from "../../../../src/config/ContextAPI";

class AboutOurStory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoadingData: false,
        }
    }

    componentDidMount() {
        // this.getData()
    }

    render() {
        const { isLoadingData, aboutData } = this.state

        return (
            <React.Fragment>
                <ContextAPI.Consumer>
                    {({ state }) => (
                        <React.Fragment>
                            <Divider hidden />
                            <Container text>
                                {/* <Segment className="fresheats-green-bg"> */}
                                        <Header className="aboutsHeaders" as='h2'>{state.about.our_story.page_header}</Header>
                                    <Divider inverted />
                                    {/* </Divider> */}
                                {/* </Segment> */}
                                <p>{state.about.our_story.description}</p>
                                <Divider hidden />
                                {isLoadingData ? <Placeholder><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /></Placeholder> : <Grid>
                                    {state.about.our_story.tags.map(item => (

                                        <Grid.Row key={item.tag_name}>
                                            <Grid.Column width={16}>
                                                <Header as="h1" icon textAlign='center'> <Icon style={{color: " #000"}} name={item.icon_tag} /></Header>
                                            </Grid.Column>
                                            <Grid.Column width={16}>
                                                <Header textAlign='center'>{item.tag_name}</Header>
                                                <p>{item.tag_descritption}</p>
                                            </Grid.Column>
                                        </Grid.Row>

                                    ))}
                                </Grid>
                                }
                            </Container>
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>

                <Divider hidden />
                <Container text>

                </Container>

                <Divider hidden />
            </React.Fragment>
        )
    }
}

export default AboutOurStory