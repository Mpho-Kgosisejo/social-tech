import React from "react"

import Layout from "../components/Layouts/Layout";
import CateringHeader from "../components/Layouts/Features/Catering/CateringHeader";
import CateringBody from "../components/Layouts/Features/Catering/CateringBody";
import api from "../src/providers/APIRequest";
import ContextAPI from "../src/config/ContextAPI";
import { PlaceholderHeader, PlaceholderParagraph } from "semantic-ui-react";

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
            <ContextAPI.Consumer>
                {({state}) => (
            <React.Fragment>
                {loading ? <React.Fragment><PlaceholderHeader /><PlaceholderParagraph /></React.Fragment> : <CateringHeader />}
            </React.Fragment>
            
            )}
            </ContextAPI.Consumer>
            
        )
    }
}

export default Catering