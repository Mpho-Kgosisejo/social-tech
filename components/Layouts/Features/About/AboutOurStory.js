import { Container, Divider, Header, Segment, Loader, Icon, Grid } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"

class AboutOurStory extends React.Component {
   
    constructor() {
        super()
        this.state = {
            responseMessage: "",
            isLoadingData: true,
            aboutData: {}
        }
    }

    getData = async () => {
        const data = await api.web.about()

        this.setState({ aboutData: data })
        console.log(this.state.aboutData)
        console.log(data.data.chefs)
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
                <Divider hidden />
                <Container text>
                    <Segment inverted>
                        <Divider horizontal inverted>
                            <Header className="aboutsHeaders" as='h2'>{aboutData.page_header}</Header>
                        </Divider>
                    </Segment>
                    <p>{aboutData.description}</p>
                    <Divider hidden/>
                    {isLoadingData ? <Loader active inline='centered'>Loading Menu</Loader> : <Grid>
                    {aboutData.tags.map(item => (
                        
                        <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as="h1" icon textAlign='center'> <Icon name={item.icon_tag} /></Header>
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

                <Divider hidden />
            </React.Fragment>
        )
    }
}

export default AboutOurStory