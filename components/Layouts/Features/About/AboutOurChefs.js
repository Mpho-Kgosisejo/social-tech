import { Container, Divider, Card, Image, Icon, Header, Segment } from "semantic-ui-react"
import Layout from "../../Layout"

class AboutOurChefs extends React.Component {
    constructor() {
        super()
    }
    render() {
        return (
            <React.Fragment>
                <Divider hidden />
                <Container text>
                    <Segment inverted>
                        <Divider inverted />
                        <Divider horizontal inverted>
                            <Header className="aboutsHeaders" as='h2'>Our Chefs</Header>
                        </Divider>
                    </Segment>
                    <Card.Group itemsPerRow={2}>
                        <Card >
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                            <Card.Content>
                                <Card.Header>Matthew</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                            <Card.Content>
                                <Card.Header>Matthew</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Container>

                <Divider hidden />
            </React.Fragment>
        )
    }
}

export default AboutOurChefs