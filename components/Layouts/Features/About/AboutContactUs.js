import { Container, Divider, Checkbox, Button, Header, Segment, Grid, Form, TextArea } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"
import ContextAPI from "../../../../src/config/ContextAPI";

class AboutContactUs extends React.Component {
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
        
        if (data.status === 200) {
            this.setState({ responseMessage: data.data.message, isLoadingData: false, aboutData: data.data.contact_us })
        } else {
            this.setState({ responseMessage: data.error.message, isLoadingData: false })
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        const { aboutData } = this.state
        return (
            <React.Fragment>
                <Divider hidden />
                <ContextAPI.Consumer>
                    {({ state }) => (
                        // <pre>{JSON.stringify(state.about.data.contact_us, "", 2)}</pre>
                        <React.Fragment>
                            <Container text>
                                <Header className="aboutsHeaders" as='h2'>{state.about.contact_us.page_header}</Header>
                                <Divider />
                                {/* {isLoadingData ? } */}
                                <Grid columns={2} relaxed>
                                    <Grid.Column>
                                        <Segment basic>
                                            {state.about.contact_us.description}
                                        </Segment>
                                        <Header as='h2' dividing>
                                            Our Address
                                        </Header>
                                        <Segment attached>
                                            <Header as='h3'>{state.about.contact_us.sub_header}</Header>
                                            <p>{state.about.contact_us.address_1}</p>
                                            <p>{state.about.contact_us.address_2}</p>
                                            <p>{state.about.contact_us.city}</p>
                                        </Segment>
                                        <Divider hidden />
                                        <Header as='h2' dividing>
                                            Our Contact Details
                                </Header>
                                        <Segment attached>
                                            <p>Tell: {state.about.contact_us.tell}</p>
                                            <p>fax: {state.about.contact_us.fax}</p>
                                            <p>Chefs: {state.about.contact_us.chefs_phone}</p>
                                            <p>Business hours: {state.about.contact_us.business_hours}</p>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form>
                                            <Form.Input fluid label="First name:" placeholder='First name' />
                                            <Form.Input fluid label="Last name:" placeholder='Last name' />
                                            <Form.Input fluid label="Email:" placeholder='Email' />
                                            <Form.Input fluid label="Phone:" placeholder='Phone' />

                                            <Form.Field control={TextArea} placeholder='Tell us more about this request:' />
                                            <Form.Field control={Checkbox} label='I agree to the Terms and Conditions' />

                                            <Button fluid color='grey' >Submit</Button>
                                        </Form>
                                        <Divider hidden />
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </React.Fragment>
                    )}
                </ContextAPI.Consumer>
            </React.Fragment>
        )
    }
}

export default AboutContactUs