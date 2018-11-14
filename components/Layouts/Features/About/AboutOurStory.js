import { Container, Divider, Header, Segment, Loader, Icon, Grid } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from "../../../../src/config/ContextAPI";

class AboutOurStory extends React.Component {
   
    constructor(props) {
        super(props)
        this.state = {
            responseMessage: "",
            isLoadingData: true,
            aboutData: {}
        }

        console.log(">", props)
    }

    getData = async () => {
        const data = await api.web.about()

        this.setState({ aboutData: data })
        // console.log(this.state.aboutData)
        // console.log(data.data.chefs)
        if (data.status === 200) {
            this.setState({ responseMessage: data.data.message, isLoadingData: false, aboutData: data.data.our_story })
        } else {
            this.setState({ responseMessage: data.error.message, isLoadingData: false })
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { isLoadingData, aboutData } = this.state

        return (
            <React.Fragment>
                <ContextAPI.Consumer>
                    {({state}) => (
                        <React.Fragment>
                            {/* <pre>{JSON.stringify(state.about.data.our_story, "", 2)}</pre> */}
                            <Segment inverted>
                                <Divider horizontal inverted>
                                    <Header className="aboutsHeaders" as='h2'>{state.about.data.our_story.page_header}</Header>
                                </Divider>
                            </Segment>
                            <p>{state.about.data.our_story.description}</p>
                            <Divider hidden/>
                            {!state.about.data.our_story.tags ? "" : <Grid>
                                {state.about.data.our_story.tags.map(item => (
                                    
                                    <Grid.Row key={item.tag_name}>
                                    <Grid.Column width={16}>
                                        <Header as="h1" icon textAlign='center'> <Icon color=" #c59c70" name={item.icon_tag} /></Header>
                                    </Grid.Column>
                                    <Grid.Column width={16}>
                                        <Header textAlign='center'>{item.tag_name}</Header>
                                        <p>{item.tag_descritption}</p>
                                    </Grid.Column>
                                    </Grid.Row>
                                    
                                ))}
                            </Grid>
                            }   
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