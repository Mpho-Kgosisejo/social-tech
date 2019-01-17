import React from "react"

import Layout from "../components/Layouts/Layout";
import CateringHeader from "../components/Layouts/Features/Catering/CateringHeader";
import CateringBody from "../components/Layouts/Features/Catering/CateringBody";
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { PlaceholderHeader, PlaceholderParagraph } from "semantic-ui-react";
import PageHeader from "../components/utils/PageHeader";

class Catering extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: true
        }
    }

    getData = async () => {
        const data = await api.web.catering()

        if (data.status == 200)
        {
            this.props.dispatch({ type: "CATERING", payload: { ...data.data }})
            this.setState({ loading: false })
        }
        else
        {
            this.setState({loading: false})
        }
    }

    componentDidMount()
    {
        this.getData()
    }

    render() {
        const { loading } = this.state
        return (
            <Layout title="Catering" includeContainer={false}>
                <PageHeader
                    color="rgb(212, 195, 176)"
                    title="Catering services"
                    subtitle="We do catering services for small, medium and large coperates"
                />
                <ContextAPI.Consumer>
                    {({state}) => (
                <React.Fragment>
                    {loading ? <React.Fragment><PlaceholderHeader /><PlaceholderParagraph /></React.Fragment> : <CateringHeader />}
                    <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCrU9Rw7a253dKb-SMfEeCsGYgFVw9GehQ"}&libraries=places`}></script> 
                </React.Fragment>
                
                )}
                </ContextAPI.Consumer>
            </Layout>
            
        )
    }
}

export default Catering