import { Container, Divider, Card, Image, Icon, Header, Segment, Loader, Placeholder } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from "../../../../src/config/ContextAPI";

class AboutOurChefs extends React.Component {
    constructor() {
        super()
        this.state = {
            responseMessage: "",
            isLoadingData: false,
            aboutData: {}
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
                                <Header className="aboutsHeaders" as='h2'>{state.about.chefs.page_header}</Header>
                                <Divider inverted/>
                                <Divider hidden/>
                                {isLoadingData ? <Placeholder><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /><Placeholder.Line /></Placeholder> : <Card.Group itemsPerRow={2} stackable>
                                    {state.about.chefs.chef_details.map(item => (
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
            </React.Fragment>
        )
    }
}

export default AboutOurChefs