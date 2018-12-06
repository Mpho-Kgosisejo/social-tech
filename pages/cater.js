import React from "react"
import Layout from "../components/Layouts/Layout";
import CateringHeader from "../components/Layouts/Features/Catering/CateringHeader";
import CateringBody from "../components/Layouts/Features/Catering/CateringBody";

class Cater extends React.Component
{
    constructor()
    {
        super()
    }

    render()
    {
        return(
            <Layout>
                <CateringHeader />
                <CateringBody />
            </Layout>
        )
    }
}

export default Cater