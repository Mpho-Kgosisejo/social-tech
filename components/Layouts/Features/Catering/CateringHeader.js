import { Header, Container, Button, Modal, Icon, Form, Input } from "semantic-ui-react";
import PageHeader from "../../../utils/PageHeader";
import React, { Component } from 'react'

import CateringBody from "./CateringBody"
import Layout from "../../Layout"
import IndexBannerHeader from "../Index/IndexBannerHeader";

class CateringHeader extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            isLoading: false,
            phone: "",
            errors: {},
            feedback: {
                type: "info",
                header: "",
                message: ""
            }

        }
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })


    render() {
        const { open } = this.state
        return (
            <Modal
                open={open}
                onOpen={this.open}
                onClose={this.close}
                size='small'
                trigger={
                    <Button primary icon>
                        Submit <Icon name='right chevron' />
                    </Button>
                }
            >
                <Modal.Header>Confirmation
                </Modal.Header>
                <Modal.Content>
                    <p>Is this your mobile number: +27 78 567 8987</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='check' content='All Done' onClick={this.close} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const ModalExampleMultiple = () => (
    <Layout title="Catering" includeContainer={false}>
        <PageHeader
            color="rgb(212, 195, 176)"
            title="Catering services"
            subtitle="We do catering services for small, medium and large coperates"
        />
        <Container>
            <Modal trigger={<div className="request-catering">
                <Button animated="fade" fluid basic color='red'>
                    <Button.Content visible>Request a quick catering... </Button.Content>
                    <Button.Content hidden>in 5 minutes</Button.Content>
                </Button></div>}>
                <Modal.Header>Lets contact you now!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Mobile number:*</label>
                                <Input icon="phone" iconPosition='left' name="phone"/>
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <CateringHeader />

                </Modal.Actions>
            </Modal>

            <div className="catering-title text-align center">
                <Header as="h2">Event Catering </Header>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada pellentesque neque tincidunt laoreet. Sed luctus diam at sapien imperdiet posuere. In tempus tincidunt rutrum. Aenean nec lacus a augue porttitor facilisis malesuada tincidunt neque. Nam pretium ut risus et consectetur. Phasellus sagittis volutpat nunc, ut volutpat turpis consequat in. Aenean finibus consequat nisi non rutrum. Fusce lectus nibh, sollicitudin eget pharetra eget, imperdiet non augue. In faucibus sollicitudin ipsum, semper mollis massa. Curabitur lacinia varius mauris, a auctor justo maximus id. Sed sed gravida erat.</p>
            </div>
            <IndexBannerHeader desc="Awesome quotes for our catering service" header="We cater for you" image="https://demos.hogash.com/phaeton-restaurant-html/images/bestservice.jpg" />
            <CateringBody />
        </Container>
    </Layout>
)

export default ModalExampleMultiple