import { Container, Divider, Checkbox, Button, Header, Segment, Grid, Form, TextArea } from "semantic-ui-react"
import Layout from "../../Layout"
import api from "../../../../src/providers/APIRequest"

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
        console.log(this.state.aboutData)
        console.log(data.data.chefs)
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
        const { aboutData}  = this.state
        return (
            <React.Fragment>
                <Divider hidden />
                <Container text>
                    <Segment inverted>
                        <Divider horizontal inverted>
                            <Header className="aboutsHeaders" as='h2'>{aboutData.page_header}</Header>
                        </Divider>
                    </Segment>
                    <Grid columns={2} relaxed>
                        <Grid.Column>
                            <Segment basic>
                                {aboutData.description}
                            </Segment>
                            <Header as='h2' dividing>
                                Our Address
                            </Header>
                            <Segment attached>
                                <Header as='h3'>{aboutData.sub_header}</Header>
                                <p>{aboutData.address_1}</p>
                                <p>{aboutData.city}</p>
                                <p>{aboutData.address_2}</p>
                                <p>{aboutData.address_3}</p>
                            </Segment>
                            <Divider hidden />
                            <Header as='h2' dividing>
                                Our Contact Details
                                </Header>
                            <Segment attached>
                                <p>Tell: {aboutData.tell}</p>
                                <p>fax: {aboutData.fax}</p>
                                <p>Chefs: {aboutData.chefs_phone}</p>
                                <p>Business hours: {aboutData.business_hours}</p>
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

                <Divider hidden />
            </React.Fragment>
        )
    }
}

export default AboutContactUs