import { Container, Divider, Card, Image, Icon, Header, Segment, Loader } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from "../../../../src/config/ContextAPI";

class AboutOurChefs extends React.Component {
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
            this.setState({ responseMessage: data.data.message, isLoadingData: false, aboutData: data.data.chefs })
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
                    {({ state }) => (
                        <React.Fragment>
                            <Divider hidden />
                            <Container text>
                                <Segment inverted>
                                    <Divider horizontal inverted>
                                        <Header className="aboutsHeaders" as='h2'>{state.about.data.chefs.page_header}</Header>
                                    </Divider>
                                </Segment>
                                {!state.about.data.chefs.chef_details ? "" : <Card.Group itemsPerRow={2} stackable>
                                    {state.about.data.chefs.chef_details.map(item => (
                                        <Card key={item.name}>
                                            <Image className="myImgs" src={item.image_url} />
                                            <Card.Content>
                                                <Card.Header>{item.name}</Card.Header>
                                                <Card.Meta>
                                                    <span className='date'>{item.specialty}</span>
                                                </Card.Meta>
                                                <Card.Description>{item.background}</Card.Description>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <a>
                                                    <Icon name='star' />
                                                    {item.rating} rating
                                </a>
                                            </Card.Content>
                                        </Card>
                                    ))}
                                </Card.Group>}

                            </Container>
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>
                <Divider hidden />
            </React.Fragment>
        )
    }
}

export default AboutOurChefs